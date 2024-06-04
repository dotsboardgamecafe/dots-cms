
import { z } from 'zod';

import { getTournamentDetail } from '@/lib/api/tournament';

import Header from '@/components/LayoutComponents/Header';
import PageContainer from '@/components/LayoutComponents/PageContainer';
import AddTournamentForm from '@/components/PageComponents/TournamentPage/AddTournament/form';

import { AddTournamentSchema } from '@/types/tournament';

const EditTournamentPage = async ({ params: { tournament_code } }: { params: { tournament_code: string; }; }) => {

  const tournamentDetail = await getTournamentDetail(tournament_code)
  const defaultTournamentData: z.infer<typeof AddTournamentSchema> = {
    tournament_info: {
      booking_price: tournamentDetail.data.booking_price,
      game_code: tournamentDetail.data.game_code,
      image_url: tournamentDetail.data.image_url,
      level: tournamentDetail.data.difficulty,
      location: tournamentDetail.data.cafe_code,
      name: tournamentDetail.data.name,
      player_slot: tournamentDetail.data.player_slot,
      status: tournamentDetail.data.status,
      tournament_rules: tournamentDetail.data.tournament_rules,
      date: {
        end_date: tournamentDetail.data.end_date,
        start_date: tournamentDetail.data.start_date
      },
      time: {
        start_time: tournamentDetail.data.start_time,
        end_time: tournamentDetail.data.end_time
      }
    },
    tournament_prize: {
      badge_codes: tournamentDetail.data.tournament_badges.map((badge) => badge.badge_code),
      participant_vp: tournamentDetail.data.participant_vp,
      prizes_img_url: tournamentDetail.data.prizes_img_url
    }
  }

  return (
    <>
      <Header
        title='Tournament'
        subtitle={[
          { label: 'All Tournament Information', link: '/tournament' },
          { label: `Edit ${tournamentDetail.data.name} tournament`, link: '#' },
        ]}
      />
      <PageContainer>
        <AddTournamentForm defaultData={defaultTournamentData} tournamentData={tournamentDetail.data} />
      </PageContainer>
    </>
  );
};

export default EditTournamentPage;