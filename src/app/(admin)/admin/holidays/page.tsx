import type { Metadata } from "next";
import { Suspense } from "react";
import { HolidayCalendar } from "@/features/holiday/components/holiday-calendar";
import { MenuPageHeader } from "@/features/menu/components/menu-page-header";

export const metadata: Metadata = { title: "공휴일 관리" };

/** 공휴일 관리 페이지 */
export default function HolidayPage() {

  return (
    <div className="flex flex-col gap-4">
      <MenuPageHeader />
      <Suspense>
        <HolidayCalendar />
      </Suspense>
    </div>
  );
}
