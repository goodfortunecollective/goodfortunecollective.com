import BackgroundTheme from './BackgroundTheme.svelte';
import Container from './Container.svelte';
import Figure from './Figure.svelte';
import Figures from './Figures.svelte';
import Member from './Member.svelte';
import Members from './Members.svelte';
import Footer from './Footer.svelte';
import Header from './Header.svelte';
import Heading from './Heading.svelte';
import HeadingDescription from './HeadingDescription.svelte';
import HeadingList from './HeadingList.svelte';
import HeadingListItem from './HeadingListItem.svelte';
import HeadlineImages from './HeadlineImages.svelte';
import HeadlineStatement from './HeadlineStatement.svelte';
import HeadlineVideo from './HeadlineVideo.svelte';
import ImageList from './ImageList.svelte';
import Images from './Images.svelte';
import ImagesCarousel from './ImagesCarousel.svelte';
import ImagesList from './ImagesList.svelte';
import ImageAndText from './ImageAndText.svelte';
import ProjectsList from './ProjectsList.svelte';
import JobList from './JobList.svelte';
import CultureList from './CultureList.svelte';
import Link from './Link.svelte';
import Page from './Page.svelte';
import RichText from './RichText.svelte';
import SEO from './SEO.svelte';
import SocialLink from './SocialLink.svelte';
import SocialLinks from './SocialLinks.svelte';
import SubHeadline from './SubHeadline.svelte';
import TagsList from './TagsList.svelte';
import Text from './Text.svelte';
import Process from './Process.svelte';
import Video from './Video.svelte';
import TwoCols from './TwoCols.svelte';

export const components: any = {
	'background-theme': BackgroundTheme,
	'container': Container,
	'figure': Figure,
	'figures': Figures,
	'member': Member,
	'members': Members,
	'footer': Footer,
	'header': Header,
	'heading': Heading,
	'heading-description': HeadingDescription,
	'heading-list': HeadingList,
	'heading-list-item': HeadingListItem,
	'headline-images': HeadlineImages,
	'headline-statement': HeadlineStatement,
	'headline-video': HeadlineVideo,
	'image-list': ImageList,
	'images': Images,
	'images-carousel': ImagesCarousel,
	'image-and-text': ImageAndText,
	'images-list': ImagesList,
	'job-list': JobList,
	'culture-list': CultureList,
	'projects-list': ProjectsList,
	'link': Link,
	'page': Page,
	'project': Page,
	'rich-text': RichText,
	'seo': SEO,
	'social-link': SocialLink,
	'social-links': SocialLinks,
	'subheadline': SubHeadline,
	'text': Text,
	'tags-list': TagsList,
	'video': Video,
	'process': Process,
	'two-cols': TwoCols,
};

export const isPreview = (url: URL) => url.searchParams.has('_storyblok')

export const getComponentByName = (component: any, name: string) => {
	return component.content.find((blok: any) => blok.component === name)
}
