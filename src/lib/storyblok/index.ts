import ArticleHeadline from './ArticleHeadline.svelte';
import ArticleList from './ArticleList.svelte';
import ArticleListItem from './ArticleListItem.svelte';
import ArticleText from './ArticleText.svelte';
import BackgroundTheme from './BackgroundTheme.svelte';
import CardsImage from './CardsImage.svelte';
import CardsItem from './CardsItem.svelte';
import CardsScroller from './CardsScroller.svelte';
import CardsVideo from './CardsVideo.svelte';
import CenterHeadline from './CenterHeadline.svelte';
import Container from './Container.svelte';
import ContentGroup from './ContentGroup.svelte';
import Figure from './Figure.svelte';
import Footer from './Footer.svelte';
import GridColumn from './GridColumn.svelte';
import GridColumns from './GridColumns.svelte';
import Header from './Header.svelte';
import Heading from './Heading.svelte';
import HeadingDescription from './HeadingDescription.svelte';
import HeadingHoverImage from './HeadingHoverImage.svelte';
import HeadingList from './HeadingList.svelte';
import HeadingListItem from './HeadingListItem.svelte';
import HeadlineStatement from './HeadlineStatement.svelte';
import HeadlineVideo from './HeadlineVideo.svelte';
import HighlightSection from './HighlightSection.svelte';
import Image from './Image.svelte';
import ImageList from './ImageList.svelte';
import ImagesList from './ImagesList.svelte';
import JobList from './JobList.svelte';
import Link from './Link.svelte';
import MediaAndText from './MediaAndText.svelte';
import MediaParallax from './MediaParallax.svelte';
import MediaParallaxImage from './MediaParallaxImage.svelte';
import MediaParallaxVideo from './MediaParallaxVideo.svelte';
import MemberItem from './MemberItem.svelte';
import MemberList from './MemberList.svelte';
import Page from './Page.svelte';
import Paragraph from './Paragraph.svelte';
import ProjectsList from './ProjectsList.svelte';
import RichText from './RichText.svelte';
import SEO from './SEO.svelte';
import SocialLink from './SocialLink.svelte';
import SocialLinks from './SocialLinks.svelte';
import Spacer from './Spacer.svelte';
import SubHeadline from './SubHeadline.svelte';
import TagsList from './TagsList.svelte';
import Text from './Text.svelte';
import TwoCols from './TwoCols.svelte';
import Typeform from './Typeform.svelte';
import Video from './Video.svelte';

export const components: any = {
	'article-headline': ArticleHeadline,
	'article-list': ArticleList,
	'article-list-item': ArticleListItem,
	'article-text': ArticleText,
	'background-theme': BackgroundTheme,
	'cards-image': CardsImage,
	'cards-video': CardsVideo,
	'cards-item': CardsItem,
	'cards-scroller': CardsScroller,
	'center-headline': CenterHeadline,
	container: Container,
	'content-group': ContentGroup,
	figure: Figure,
	footer: Footer,
	'grid-column': GridColumn,
	'grid-columns': GridColumns,
	header: Header,
	heading: Heading,
	'heading-description': HeadingDescription,
	'heading-hover-image': HeadingHoverImage,
	'heading-list': HeadingList,
	'heading-list-item': HeadingListItem,
	'headline-statement': HeadlineStatement,
	'headline-video': HeadlineVideo,
	'highlight-section': HighlightSection,
	image: Image,
	'image-list': ImageList,
	'images-list': ImagesList,
	'job-list': JobList,
	link: Link,
	'media-and-text': MediaAndText,
	'media-parallax': MediaParallax,
	'media-parallax-image': MediaParallaxImage,
	'media-parallax-video': MediaParallaxVideo,
	'member-item': MemberItem,
	'member-list': MemberList,
	'projects-list': ProjectsList,
	page: Page,
	paragraph: Paragraph,
	project: Page,
	'rich-text': RichText,
	seo: SEO,
	'social-link': SocialLink,
	'social-links': SocialLinks,
	spacer: Spacer,
	subheadline: SubHeadline,
	text: Text,
	'tags-list': TagsList,
	'two-cols': TwoCols,
	typeform: Typeform,
	video: Video
};

export const isPreview = (url: URL) => url.searchParams.has('_storyblok');

export const getComponentByName = (component: any, name: string) => {
	return component.content.find((blok: any) => blok.component === name);
};
