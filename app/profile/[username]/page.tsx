"use client";
import { usePathname } from "next/navigation";
import DynamicProfile from "@/app/Components/Profile/DynamicProfile";

export default function Page() {
  const pathname = usePathname();
  const pathArray = pathname ? pathname.split("/") : "Error 404";

  // Ensure pathArray has at least one element before accessing the last one
  const usernameProvided =
    pathArray.length >= 2
      ? pathArray[pathArray.length - 1]
      : "No username provided";

  return (
    <div>
      <DynamicProfile dynamicUsername={`${usernameProvided}`}></DynamicProfile>
    </div>
  );
}
