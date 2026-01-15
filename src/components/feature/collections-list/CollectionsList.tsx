import Link from "next/link";

import { Collection, COLLECTION_TYPES } from "@/types/collection";

interface CollectionsListProps {
	collectionData: {
		collectionList: Collection[];
		totalCollectionCount: number;
	};
}

export const CollectionsList: React.FC<CollectionsListProps> = ({
	collectionData,
}) => {
	const groupedCollections = collectionData.collectionList.reduce(
		(acc, collection) => {
			const type = collection.type;
			if (!acc[type]) {
				acc[type] = [];
			}
			acc[type].push(collection);
			return acc;
		},
		{} as Record<string, Collection[]>
	);

	const typeOrder = Object.keys(
		COLLECTION_TYPES
	) as (keyof typeof COLLECTION_TYPES)[];

	return (
		<div className="flex flex-col gap-8">
			{typeOrder.map((typeKey) => {
				const group = groupedCollections[typeKey];

				if (!group || group.length === 0) return null;

				const config = COLLECTION_TYPES[typeKey];

				return (
					<section
						key={typeKey}
						className="flex flex-col gap-4"
					>
						<div className="flex items-center gap-3">
							<h2 className="text-xl font-bold dark:text-white">
								{config.label}
							</h2>
						</div>
						<div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
							{group.map((collection) => (
								<Link
									href={`/collections/${collection.slug}`}
									className="block transition-transform hover:scale-[1.01]"
									key={collection.id}
								>
									{collection.name}
								</Link>
							))}
						</div>
					</section>
				);
			})}
		</div>
	);
};
