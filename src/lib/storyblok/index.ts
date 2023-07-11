import AlternateList from './AlternateList.svelte';
import Container from './Container.svelte';
import Figure from './Figure.svelte';
import Figures from './Figures.svelte';
import Heading from './Heading.svelte';
import HeadingDescription from './HeadingDescription.svelte';
import HeadlineStatement from './HeadlineStatement.svelte';
import HeadlineVideo from './HeadlineVideo.svelte';
import HeadlineImages from './HeadlineImages.svelte';
import ImageList from './ImageList.svelte';
import Images from './Images.svelte';
import ImagesList from './ImagesList.svelte';
import ImageAndText from './ImageAndText.svelte';
import ProjectsList from './ProjectsList.svelte';
import JobList from './JobList.svelte';
import Link from './Link.svelte';
import Page from './Page.svelte';
import RichText from './RichText.svelte';
import SEO from './SEO.svelte';
import SocialLink from './SocialLink.svelte';
import SocialLinks from './SocialLinks.svelte';
import Text from './Text.svelte';
import TextCols from './TextCols.svelte';
import Video from './Video.svelte';

export const components: any = {
    'alternate-list': AlternateList,
    'container': Container,
    'figure': Figure,
    'figures': Figures,
    heading: Heading,
    'heading-description': HeadingDescription,
    'headline-statement': HeadlineStatement,
    'headline-video': HeadlineVideo,
		'headline-images':HeadlineImages,
    'image-list': ImageList,
    'images': Images,
    'image-and-text': ImageAndText,
    'images-list': ImagesList,
    'job-list': JobList,
    'projects-list': ProjectsList,
    link: Link,
    page: Page,
    project: Page,
    'rich-text': RichText,
    seo: SEO,
    'social-link': SocialLink,
    'social-links': SocialLinks,
    text: Text,
    'text-cols': TextCols,
    'video': Video,
};
