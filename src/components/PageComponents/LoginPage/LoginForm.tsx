'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { login } from '@/lib/api/server/auth';

import { Button } from '@/components/ui/Buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormMessageRoot } from '@/components/ui/Form';
import Checkbox from '@/components/ui/Input/Checkbox';
import Password from '@/components/ui/Input/Password';
import Text from '@/components/ui/Input/Text';
import Typography from '@/components/ui/Typography';

import { ResponseCode } from '@/constant/response_code';

import { LoginPayload, LoginSchema } from '@/types/users';

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get('err') === 'expired_session') {
      form.setError('root', { message: 'Session expired. Please login again' });
    }
  }, [searchParams]);

  const form = useForm<LoginPayload>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      setLoading(true);
      const res = await login(data);
      if (res.stat_code === ResponseCode.ERROR) throw "Wrong Email/Password";
      router.push('/room');
    } catch (error: any) {
      form.setError('root', { message: error || 'Something went wrong' });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <section>
          <section id='login-heading' className='flex flex-col mb-[30px]'>
            <Typography variant='heading-h3' color='neutral-ink'>
              Welcome&#128075;
            </Typography>
            <Typography variant='text-body-l-regular' className='text-gray-500'>
              Please login here
            </Typography>

          </section>
          <section id='login-form' className='flex flex-col gap-5'>
            <FormMessageRoot />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Email
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Text placeholder='Enter email address' value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    <Typography variant='paragraph-l-medium'>
                      Password
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Password placeholder='Enter password' toggler value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-row justify-between'>
              <Checkbox label='Remember me' />
              <Link href="#">
                <Typography variant='text-body-l-regular' color='brand-blue-electric'>
                  Forgot Password?
                </Typography>
              </Link>
            </div>
            <Button variant="default" size="lg" type='submit' loading={loading}>
              <Typography variant='paragraph-l-bold' className='text-white'>
                Log In
              </Typography>
            </Button>
          </section>
        </section>
      </form>
    </Form>
  );
};

export default LoginForm;