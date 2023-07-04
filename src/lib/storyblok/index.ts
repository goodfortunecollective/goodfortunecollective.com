import AlternateListBlock from './AlternateListBlock.svelte';
import FiguresBlock from './FiguresBlock.svelte';
import Flex from './Flex.svelte';
import Heading_Richtext_2Col from './Heading_Richtext_2Col.svelte';
import Heading from './Heading.svelte';
import HeadlineStatement from './HeadlineStatement.svelte';
import ImageListBlock from './ImageListBlock.svelte';
import ImagesBlock from './ImagesBlock.svelte';
import ImagesListBlock from './ImagesListBlock.svelte';
import Link from './Link.svelte';
import Page from './Page.svelte';
import Project from './Project.svelte';
import Text from './Text.svelte';
import VideoBlock from './VideoBlock.svelte';

export const components = () => {
    return {
        'alternate-list-block': AlternateListBlock,
        'figures-block': FiguresBlock,
        flex: Flex,
        'heading-richtext-2col': Heading_Richtext_2Col,
        heading: Heading,
        'headline-statement': HeadlineStatement,
        'image-list-block': ImageListBlock,
        'images-block': ImagesBlock,
        'images-list-block': ImagesListBlock,
        link: Link,
        page: Page,
        project: Project,
        text: Text,
        'video-block': VideoBlock,
    };
};