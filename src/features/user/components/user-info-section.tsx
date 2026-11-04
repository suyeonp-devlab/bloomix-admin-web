"use client";

import { useRouter } from "next/navigation";
import { FormCell } from "@/components/form/form-cell";
import { FormRow } from "@/components/form/form-row";
import { FormSection } from "@/components/form/form-section";
import { FormTable } from "@/components/form/form-table";
import { FormValue } from "@/components/form/form-value";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { formatDateTime } from "@/lib/utils/date";
import { overlay } from "@/stores/overlay-store";
import { useUpdateUserStatusMutation } from "../user.queries";
import type { User, UserStatus } from "../user.type";

type UserInfoSectionProps = {
  user: User;
  listHref: string;
};

/** 회원 상세 > 회원 정보 */
export function UserInfoSection({ user, listHref }: UserInfoSectionProps) {

  const router = useRouter();

  const { mutateAsync: updateStatus, isPending } = useUpdateUserStatusMutation();

  // 상태 변경 (정상 ↔ 이용정지만 가능)
  const changeStatus = async (status: UserStatus, label: string) => {

    const confirmed = await overlay.confirm(
      `${user.nickname ?? "회원"}님을\n${label}하시겠습니까?`,
      { confirmText: label, tone: status === "SUSPENDED" ? "danger" : "default" },
    );
    if (!confirmed) return;

    await updateStatus({ userId: user.userId, body: { status } });
    await overlay.alert(`${label}되었습니다.`);
  };

  return (
    <FormSection
      title="회원 정보"
      actions={
        <div className="flex gap-2">
          <Button onClick={() => router.push(listHref)}>목록</Button>
          {user.status === "ACTIVE" && (
            <Button variant="danger" disabled={isPending} onClick={() => changeStatus("SUSPENDED", "이용 정지")}>이용 정지</Button>
          )}
          {user.status === "SUSPENDED" && (
            <Button disabled={isPending} onClick={() => changeStatus("ACTIVE", "정지 해제")}>정지 해제</Button>
          )}
        </div>
      }
    >
      <FormTable>
        <FormRow>
          <FormCell label="계정 ID">
            <FormValue value={user.providerId} />
          </FormCell>
          <FormCell label="가입 수단">
            <FormValue value={user.providerName} />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell label="이메일">
            <FormValue value={user.email} />
          </FormCell>
          <FormCell label="닉네임">
            <FormValue value={user.nickname} />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell label="상태">
            <FormValue value={
              <span className={cn((user.status === "SUSPENDED" || user.status === "LOCKED") && "text-danger")}>{user.statusName}</span>
            } />
          </FormCell>
          <FormCell label="가입일시">
            <FormValue value={formatDateTime(user.joinedAt)} />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell label="최근 로그인일시">
            <FormValue value={formatDateTime(user.lastLoginAt)} />
          </FormCell>
          <FormCell label="비밀번호 변경일시">
            <FormValue value={formatDateTime(user.passwordChangedAt)} />
          </FormCell>
        </FormRow>
        <FormRow>
          <FormCell label="비밀번호 실패" span={3}>
            <FormValue value={`${user.passwordFailCount}회`} />
          </FormCell>
        </FormRow>
      </FormTable>
    </FormSection>
  );
}
