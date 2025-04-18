// @ts-ignore

import { reactive, computed } from "vue";

export const useMetaSeoIndex = () => {
	const siteData = reactive({
		title: "",
		description: "",
		content: "",
		ogTitle: "",
		ogDescription: "",
		ogImage: "/favicon.png",
		ogType: "",
		ogLink: "",
		robots: "index, follow",
		ogImageWidth: "1200",
		ogSideName: "",
		ogImageHeight: "628",
	});

	useHead({
		// Can be static or computed
		title: computed(() => siteData.title),
		meta: [
			{
				name: "description",
				content: computed(() => siteData.description),
			},
			{
				property: "og:title",
				content: computed(() => siteData.ogTitle),
			},
			{
				property: "og:type",
				content: computed(() => "website"),
			},
			{
				property: "og:url",
				content: computed(() => siteData.ogLink),
			},
			{
				property: "og:description",
				content: computed(() => siteData.ogDescription),
			},
			{
				property: "og:image",
				content: computed(() => siteData.ogImage),
			},
			{
				name: "robots",
				content: computed(() => siteData.robots),
			},
			{
				property: "og:image:width",
				content: computed(() => siteData.ogImageWidth),
			},
			{
				property: "og:site_name",
				content: computed(() => "website"),
			},
			{
				property: "og:image:height",
				content: computed(() => siteData.ogImageHeight),
			},
		],

		link: [{ rel: "canonical", href: "/", id: "canonical" }],
	});
	return useHead;
};
