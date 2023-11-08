import ArticleList from './ArticleList.svelte';
import ArticleHeadline from './ArticleHeadline.svelte';
import ArticleListItem from './ArticleListItem.svelte';
import ArticleText from './ArticleText.svelte';
import BackgroundTheme from './BackgroundTheme.svelte';
import CardsImage from './CardsImage.svelte';
import CardsVideo from './CardsVideo.svelte';
import CardsItem from './CardsItem.svelte';
import CardsScroller from './CardsScroller.svelte';
import Container from './Container.svelte';
import Figure from './Figure.svelte';
import Figures from './Figures.svelte';
import Footer from './Footer.svelte';
import Header from './Header.svelte';
import Heading from './Heading.svelte';
import HeadingDescription from './HeadingDescription.svelte';
import HeadingHoverImage from './HeadingHoverImage.svelte';
import HeadingList from './HeadingList.svelte';
import HeadingListItem from './HeadingListItem.svelte';
import HeadlineStatement from './HeadlineStatement.svelte';
import HeadlineVideo from './HeadlineVideo.svelte';
import ImageList from './ImageList.svelte';
import Images from './Images.svelte';
import ImagesParallax from './ImagesParallax.svelte';
import ImagesParallaxItem from './ImagesParallaxItem.svelte';
import ImagesParallaxItemVideo from './ImagesParallaxItemVideo.svelte';
import ImagesList from './ImagesList.svelte';
import JobList from './JobList.svelte';
import Link from './Link.svelte';
import MediaAndText from './MediaAndText.svelte';
import MemberItem from './MemberItem.svelte';
import MemberList from './MemberList.svelte';
import Paragraph from './Paragraph.svelte';
import ProjectsList from './ProjectsList.svelte';
import Page from './Page.svelte';
import RichText from './RichText.svelte';
import SEO from './SEO.svelte';
import SocialLink from './SocialLink.svelte';
import SocialLinks from './SocialLinks.svelte';
import SubHeadline from './SubHeadline.svelte';
import TagsList from './TagsList.svelte';
import Text from './Text.svelte';
import TwoCols from './TwoCols.svelte';
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
	'container': Container,
	'figure': Figure,
	'figures': Figures,
	'footer': Footer,
	'header': Header,
	'heading': Heading,
	'heading-description': HeadingDescription,
	'heading-hover-image': HeadingHoverImage,
	'heading-list': HeadingList,
	'heading-list-item': HeadingListItem,
	'headline-statement': HeadlineStatement,
	'headline-video': HeadlineVideo,
	'image-list': ImageList,
	'images': Images,
	'images-list': ImagesList,
	'images-parallax': ImagesParallax,
	'images-parallax-item': ImagesParallaxItem,
	'images-parallax-item-video': ImagesParallaxItemVideo,
	'job-list': JobList,
	'link': Link,
	'media-and-text': MediaAndText,
	'member-item': MemberItem,
	'member-list': MemberList,
	'projects-list': ProjectsList,
	'page': Page,
	'paragraph': Paragraph,
	'project': Page,
	'rich-text': RichText,
	'seo': SEO,
	'social-link': SocialLink,
	'social-links': SocialLinks,
	'subheadline': SubHeadline,
	'text': Text,
	'tags-list': TagsList,
	'two-cols': TwoCols,
	'video': Video,
};

export const isPreview = (url: URL) => url.searchParams.has('_storyblok')

export const getComponentByName = (component: any, name: string) => {
	return component.content.find((blok: any) => blok.component === name)
}
