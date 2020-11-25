import React, { ReactElement } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';

export interface StackElementProps {
    id: number;
    img: string;
    title: string;
    link: string;
}

function StackElement({
    img,
    title,
    link,
}: StackElementProps): ReactElement {
    return (
        <ListItem
            button
            component={Link}
            to={link}
        >
            <Image
                publicId={img}
                height="50"
                width="100"
            />
            <ListItemText>
                {title}
            </ListItemText>
        </ListItem>
    );
}

export default StackElement;
