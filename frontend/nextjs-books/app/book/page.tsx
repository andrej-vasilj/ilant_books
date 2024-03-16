import DetailProvider from '@/app/ui/detailProvider';
import { Suspense } from "react";
 
export default function Page() {
  return (
  	<Suspense>
  		<DetailProvider/>
  	</Suspense>
  );
}