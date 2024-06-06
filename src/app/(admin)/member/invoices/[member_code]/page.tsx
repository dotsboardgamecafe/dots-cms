
import { Suspense } from 'react';

import { getMemberDetail, getMemberInvoices } from '@/lib/api/member';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import MemberInvoicePage from '@/components/PageComponents/MemberInvoiceHistory';

import { Pagination } from '@/types/network';

type Props = Omit<Pagination, 'keyword'> & {
  params: { member_code: string }
};

const ClaimHistoryPage = async ({ params, ...searchParams }: Props) => {
  const memberDetail = await getMemberDetail(params.member_code);
  const invoiceHistory = await getMemberInvoices({ param: params.member_code, query: searchParams })

  return (
    <div>
      <Header title='Invoice Claim' subtitle={[{
        label: 'All Member Information',
        link: '/member'
      }, {
        label: 'Manual Claim Invoice',
        link: '#'
      }]} />
      <PageContainer>
        <Suspense>
          <MemberInvoicePage data={invoiceHistory.data} memberData={memberDetail.data} pagination={invoiceHistory.pagination} />
        </Suspense>
      </PageContainer>
    </div>
  );
};

export default ClaimHistoryPage;