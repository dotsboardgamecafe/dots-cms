'use client';
// type Props = PropsWithRef<PropsWithChildren>;
import { zodResolver } from "@hookform/resolvers/zod";
import { Cup, InfoCircle } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { addTournament, editTournament } from "@/lib/api/tournament";

import PrizeForm from "@/components/PageComponents/TournamentPage/AddTournament/prize-form";
import TournamentInfoForm from "@/components/PageComponents/TournamentPage/AddTournament/tournament-info-form";
import { Button } from '@/components/ui/Buttons';
import { Form } from '@/components/ui/Form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useToast } from "@/components/ui/Toast/use-toast";
import Typography from '@/components/ui/Typography';

import { AddTournamentPayload, AddTournamentSchema, TournamentDetailType } from '@/types/tournament';

type Props = {
  defaultData?: z.infer<typeof AddTournamentSchema>,
  tournamentData?: TournamentDetailType
};

const AddTournamentForm = ({ defaultData, tournamentData }: Props) => {
  const [activeTab, setActiveTab] = useState<string>('tournament_info')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const router = useRouter()

  const { toast } = useToast()

  const form = useForm<z.infer<typeof AddTournamentSchema>>({
    defaultValues: {
      tournament_info: {
        booking_price: 0,
        date: {
          start_date: '',
          end_date: '',
        },
        game_code: '',
        image_url: '',
        level: '',
        location: '',
        name: '',
        player_slot: 0,
        status: 'active',
        tournament_rules: '',
        time: {
          start_time: '',
          end_time: ''
        },
        ...defaultData?.tournament_info
      },
      tournament_prize: {
        participant_vp: 0,
        badge_codes: [],
        prizes_img_url: '',
        ...defaultData?.tournament_prize
      }
    },
    resolver: zodResolver(AddTournamentSchema),
  });

  const onSubmit = async (data: z.infer<typeof AddTournamentSchema>) => {
    setIsSubmitting(true)

    const isStartTimeWithSecond = data.tournament_info.time.start_time.split(':').length > 2
    const isEndTimeWithSecond = data.tournament_info.time.end_time.split(':').length > 2

    const payload: AddTournamentPayload = {
      game_code: data.tournament_info.game_code,
      image_url: data.tournament_info.image_url,
      name: data.tournament_info.name,
      tournament_rules: data.tournament_info.tournament_rules,
      level: data.tournament_info.level,
      start_date: data.tournament_info.date.start_date,
      end_date: data.tournament_info.date.end_date,
      start_time: isStartTimeWithSecond ? data.tournament_info.time.start_time : `${data.tournament_info.time.start_time}:00`,
      end_time: isEndTimeWithSecond ? data.tournament_info.time.end_time : `${data.tournament_info.time.end_time}:00`,
      player_slot: data.tournament_info.player_slot,
      booking_price: data.tournament_info.booking_price,
      badge_codes: data.tournament_prize.badge_codes,
      prizes_img_url: data.tournament_prize.prizes_img_url,
      status: data.tournament_info.status,
      participant_vp: data.tournament_prize.participant_vp,
      location_code: data.tournament_info.location
    };

    try {
      if (defaultData) await editTournament({ body: payload, param: tournamentData?.tournament_code });
      else await addTournament({ body: payload });
      toast({
        title: `Tournament successfully ${defaultData ? 'updated!' : 'added!'}`,
        variant: 'default',
      });
      router.replace('/tournament')
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: `failed to ${defaultData ? 'update' : 'add'} the tournament`,
        variant: 'destructive',
      });
    }

    setIsSubmitting(false)
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
          <Tabs defaultValue="tournament_info" className='w-full gap-6 flex flex-col' value={activeTab} onValueChange={async (newTab) => {
            if (newTab === 'tournament_prize') {
              const isTournamentInfoFilled = await form.trigger('tournament_info')
              if (!isTournamentInfoFilled) return
            }

            setActiveTab(newTab)
          }}>
            <TabsList className='gap-6'>
              <TabsTrigger value="tournament_info" className='gap-2'>
                <InfoCircle size={24} variant='Bold' />
                <Typography variant='text-body-xxl-heavy'>
                  Tournament Information
                </Typography>
              </TabsTrigger>
              <TabsTrigger value="tournament_prize" className='gap-2'>
                <Cup size={24} />
                <Typography variant='text-body-xxl-heavy'>
                  Prizes
                </Typography>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tournament_info" >
              <TournamentInfoForm tournamentDetail={tournamentData} />
            </TabsContent>
            <TabsContent value="tournament_prize" className="gap-2">
              <PrizeForm tournamentBadges={tournamentData?.tournament_badges} />
            </TabsContent>
          </Tabs>
          <section className='w-full flex justify-end gap-[16px]'>
            <Button variant='secondary' size="xl" onClick={(evt) => { evt.preventDefault(); form.reset(); router.replace('/tournament') }}>
              Cancel
            </Button>
            <Button variant='default' size="xl" type='submit' disabled={isSubmitting} onClick={async (event) => {
              if (activeTab === 'tournament_prize') return
              event.preventDefault()

              const isTournamentInfoValid = await form.trigger('tournament_info')
              if (!isTournamentInfoValid) return

              setActiveTab('tournament_prize')
            }}>
              {activeTab === 'tournament_prize' ? defaultData ? 'Save Changes' : 'Add' : 'Next'}
            </Button>
          </section>
        </form>
      </Form>
    </>
  );
};

export default AddTournamentForm;