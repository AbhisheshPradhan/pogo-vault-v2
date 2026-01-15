"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function CustomBreadcrumb({
	labelMap = {},
}: {
	labelMap?: Record<string, string>;
}) {
	const pathname = usePathname();

	const segments = pathname.split("/").filter(Boolean);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{/* Home */}
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>

				{segments.map((segment, index) => {
					const href = "/" + segments.slice(0, index + 1).join("/");
					const isLast = index === segments.length - 1;

					const label =
						labelMap[segment] ??
						decodeURIComponent(segment)
							.replace(/-/g, " ")
							.replace(/\b\w/g, (l) => l.toUpperCase());

					return (
						<div
							key={href}
							className="flex items-center"
						>
							<BreadcrumbSeparator className="mr-2" />

							<BreadcrumbItem>
								{isLast ? (
									<BreadcrumbPage>{label}</BreadcrumbPage>
								) : (
									<BreadcrumbLink href={href}>
										{label}
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>
						</div>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
