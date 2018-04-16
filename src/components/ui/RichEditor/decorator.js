import {CompositeDecorator} from 'draft-js';

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

const Link = (props) => {
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url} style={styles.link}>
            {props.children}
        </a>
    );
};

function findImageEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'IMAGE'
            );
        },
        callback
    );
}

const Image = (props) => {
    const {
        height,
        src,
        width,
    } = props.contentState.getEntity(props.entityKey).getData();

    return (
        <img src={src} height={height} width={width} />
    );
};

export const decorator = new CompositeDecorator([
    {
        strategy: findLinkEntities,
        component: Link,
    },
    {
        strategy: findImageEntities,
        component: Image,
    },
]);