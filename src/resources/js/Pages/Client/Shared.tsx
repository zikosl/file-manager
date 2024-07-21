import ComingSoon from "@/errors/coming-soon";
import { ContentLayout } from "@/layout/client/content-layout";

export default function Shared() {
    return (
        <ContentLayout title="Shared Drive">
            <ComingSoon />
        </ContentLayout>
    )
}

