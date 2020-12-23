import {
    createSlice,
    createEntityAdapter,
    createSelector,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit';
import {
    getNewsListByDecentOrder,
    getPage,
    updatePageRequest,
    UpdatePage,
    newPageRequest,
    Page,
    deleteNews as deleteNewsRequest,
    getNewsCount as getNewsCountRequest,
} from '../services';
import {
    getTranslation,
    TranslationContainer,
} from '../../../share/translationContainer';
import {
    News,
    RootState,
    DataState,
    NewsOrder,
} from './types';
import { ROOT_REDUCER_NAME } from './constants';
import rootSelector from './rootSelector';

const REDUCER_NAME = `${ROOT_REDUCER_NAME}/data`;

const newsAdapter = createEntityAdapter<News>({
    selectId: (news) => news.id,
    sortComparer: (a, b) => b.id - a.id,
});

const descentOrderAdapter = createEntityAdapter<NewsOrder>({
    selectId: (order) => order.id,
    sortComparer: (a, b) => b.id - a.id,
});

const initialState: DataState = {
    news: newsAdapter.getInitialState(),
    descentOrder: descentOrderAdapter.getInitialState(),
    maxCount: 0,
};

const dataSelector = createSelector(
    rootSelector,
    (state) => state.data,
);

const newsAdapterGlobalSelectors = newsAdapter.getSelectors<RootState>(
    (state) => dataSelector(state).news,
);

const newsAdapterLocalSelectors = newsAdapter.getSelectors<DataState>(
    (state) => state.news,
);

const descentOrderAdapterGlobalSelectors = descentOrderAdapter.getSelectors<RootState>(
    (state) => dataSelector(state).descentOrder,
);

const descentOrderAdapterLocalSelectors = descentOrderAdapter.getSelectors<DataState>(
    (state) => state.descentOrder,
);

function getTranslationField(
    state: RootState,
    id: number,
    lang: string,
    selector: (news: News | undefined) => TranslationContainer<string> | undefined,
): string {
    const news = newsAdapterGlobalSelectors.selectById(state, id);
    const translationContainer = selector(news);

    if (translationContainer) {
        return getTranslation(translationContainer, lang);
    }

    return '';
}

const selectors = {
    news: (id: number) => (
        (state: RootState): News | undefined => (
            newsAdapterGlobalSelectors.selectById(state, id)
        )
    ),
    newsList: (start: number, end: number) => (
        (state: RootState): News[] => {
            const selectOrder = (order: number) => (
                descentOrderAdapterGlobalSelectors.selectById(state, order)
            );
            const selectNews = (id: number) => (
                newsAdapterGlobalSelectors.selectById(state, id)
            );

            const res = Array<News>();

            for (let i = start; i <= end; i += 1) {
                const orderMatch = selectOrder(i);

                if (orderMatch) {
                    const news = selectNews(orderMatch.newsId);

                    if (news) {
                        res.push(news);
                    }
                }
            }

            return res;
        }
    ),
    allNews: newsAdapterGlobalSelectors.selectAll,
    newsTitle: (id: number, lang: string) => (
        (state: RootState): string => (
            getTranslationField(
                state,
                id,
                lang,
                (news) => news?.title,
            )
        )
    ),
    newsContent: (id: number, lang: string) => (
        (state: RootState): string => (
            getTranslationField(
                state,
                id,
                lang,
                (news) => news?.content,
            )
        )
    ),
    maxCount: createSelector(
        dataSelector,
        (data) => data.maxCount,
    ),
};

interface GetShortNewsListProps {
    start: number;
    end: number;
}

function isLoadRequire(state: RootState, start: number, end: number): boolean {
    for (let i = start; i <= end; i += 1) {
        if (!descentOrderAdapterGlobalSelectors.selectById(state, i)) {
            return true;
        }
    }
    return false;
}

interface ShortNewsList {
    start: number;
    end: number;
    news: Array<News>;
}

const initShortNewsList = createAsyncThunk(
    `${REDUCER_NAME}/initShortNewsList`,
    async ({ start, end }: GetShortNewsListProps, thunkAPI) => {
        const res: ShortNewsList = { start, end, news: [] };

        if (isLoadRequire(thunkAPI.getState() as RootState, start, end)) {
            res.news = await getNewsListByDecentOrder(start, end);
        }

        return res;
    },
);

function insertShortNewsIfNeed(state: DataState, news: Array<News>) {
    const existNews = newsAdapterLocalSelectors.selectEntities(state);

    news.forEach((cur) => {
        if (!existNews[cur.id]) {
            newsAdapter.addOne(state.news, cur);
        }
    });
}

function getShift(order: Array<NewsOrder>, news: ShortNewsList): number | null {
    const newsIds = news.news.map((cur) => cur.id);
    let foundId = 0;

    const firstElementPosition = order.findIndex((elem) => {
        foundId = newsIds.indexOf(elem.newsId);
        return foundId === -1;
    });

    if (firstElementPosition !== -1) {
        return foundId + news.start - order[firstElementPosition].id;
    }
    return null;
}

function shiftOrder(
    order: Array<NewsOrder>,
    from: number,
    shift: number,
): Array<NewsOrder> {
    return order.map((cur) => {
        const copyCur = { ...cur };

        if (copyCur.id >= from) {
            copyCur.id += shift;
        }

        return copyCur;
    });
}

function insertOrderId(
    order: Array<NewsOrder>,
    insertNews: Array<News>,
    startId: number,
): Array<NewsOrder> {
    return [
        ...order,
        ...insertNews.map((cur, index) => ({
            id: startId + index,
            newsId: cur.id,
        })),
    ];
}

function updateOrder(state: DataState, news: ShortNewsList) {
    const order = descentOrderAdapterLocalSelectors.selectAll(state);
    const shift = getShift(order, news);

    switch (shift) {
        case null:
            descentOrderAdapter.setAll(
                state.descentOrder,
                insertOrderId(order, news.news, news.start),
            );
            break;
        case 0:
            break;
        default:
            descentOrderAdapter.setAll(
                state.descentOrder,
                insertOrderId(
                    shiftOrder(order, news.start, shift),
                    news.news.slice(0, shift),
                    news.start,
                ),
            );
            break;
    }
}

const initFullNews = createAsyncThunk(
    `${REDUCER_NAME}/getFullNews`,
    async (id: number, { getState }) => {
        let news = selectors.news(id)(getState() as RootState);

        if (!(news?.type === 'full')) {
            news = await getPage(id);
        }

        return news;
    },
);

const updateNews = createAsyncThunk(
    `${REDUCER_NAME}/updateNews`,
    async (data: UpdatePage): Promise<News> => {
        await updatePageRequest(data);

        return {
            ...data,
            type: 'full',
        };
    },
);

const addNews = createAsyncThunk(
    `${REDUCER_NAME}/addNews`,
    async (data: Page): Promise<News> => {
        const id = await newPageRequest(data);

        return {
            id,
            type: 'full',
            ...data,
        };
    },
);

const deleteNews = createAsyncThunk(
    `${REDUCER_NAME}/delete`,
    deleteNewsRequest,
);

function upsertNewsState(state: DataState, news: News) {
    newsAdapter.upsertOne(state.news, news);
}

const initNewsCount = createAsyncThunk(
    `${REDUCER_NAME}/getNewsCount`,
    getNewsCountRequest,
);

const slice = createSlice({
    name: REDUCER_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                initShortNewsList.fulfilled,
                (state, { payload } : PayloadAction<ShortNewsList>) => {
                    if (payload.news.length !== 0) {
                        insertShortNewsIfNeed(state, payload.news);
                        updateOrder(state, payload);
                    }
                },
            )
            .addCase(
                initFullNews.fulfilled,
                (state, { payload }: PayloadAction<News | undefined>) => {
                    if (payload) {
                        upsertNewsState(state, payload);
                    }
                },
            )
            .addCase(
                updateNews.fulfilled,
                (state, { payload }: PayloadAction<News>) => {
                    upsertNewsState(state, payload);
                },
            )
            .addCase(
                addNews.fulfilled,
                (state, { payload }: PayloadAction<News>) => {
                    const order = descentOrderAdapter
                        .getSelectors()
                        .selectAll(state.descentOrder)
                        .map((cur) => ({
                            id: cur.id + 1,
                            newsId: cur.newsId,
                        }));

                    order.push({
                        id: 0,
                        newsId: payload.id,
                    });
                    newsAdapter.addOne(state.news, payload);
                    descentOrderAdapter.setAll(state.descentOrder, order);
                },
            )
            .addCase(
                deleteNews.fulfilled,
                (state, { payload }: PayloadAction<number>) => {
                    const order = descentOrderAdapterLocalSelectors
                        .selectAll(state);

                    newsAdapter.removeOne(state.news, payload);
                    descentOrderAdapter.setAll(
                        state.descentOrder,
                        order.reduce(
                            (accum, cur) => {
                                if (cur.newsId > payload) {
                                    return [...accum, cur];
                                }
                                if (cur.newsId === payload) {
                                    return accum;
                                }

                                return [
                                    ...accum,
                                    {
                                        id: cur.id - 1,
                                        newsId: cur.newsId,
                                    },
                                ];
                            },
                            new Array<NewsOrder>(),
                        ),
                    );
                },
            )
            .addCase(
                initNewsCount.fulfilled,
                (state, { payload }: PayloadAction<number>) => {
                    state.maxCount = payload;
                },
            );
    },
});

export const actions = {
    ...slice.actions,
    initFullNews,
    initShortNewsList,
    updateNews,
    addNews,
    deleteNews,
    initNewsCount,
};
export { selectors };
export const { reducer } = slice;
