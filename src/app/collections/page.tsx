import { CollectionsList } from "@/components/feature/collections-list/CollectionsList";
import { PageHeader } from "@/components/layout/PageHeader";

export default async function CollectionsPage() {
	const data = await fetch(process.env.API_URL + "/api/collections");
	const collectionData = await data.json();

	console.log("collectionData", collectionData);
	return (
		<div className="flex flex-col px-4">
			<PageHeader pageHeading="Collections" />
			<CollectionsList collectionData={collectionData} />
		</div>
	);
}
