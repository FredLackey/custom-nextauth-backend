'use client';

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

const ConfirmLogin = () => {

  const params = useSearchParams();
  const router = useRouter();
  const [ data, setData ] = useState({ 
    address: params.get('address'), 
    code: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn('credentials', { ...data, redirect: false });
    router.push('/dashboard')
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Confirm Login Request
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Email Address or Mobile Number
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={data.address}
                  onChange={e => { setData({ ...data, address: e.target.value }) }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirmation Code
                </label>
                <div className="text-sm">
                  <a href={`/login/request${data.address ? `?address=${data.address}` : ''}`} className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Need a code? Click here.
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  placeholder='ABC123'
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={data.code}
                  onChange={e => { setData({ ...data, code: e.target.value }) }}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
    )
}

export default ConfirmLogin