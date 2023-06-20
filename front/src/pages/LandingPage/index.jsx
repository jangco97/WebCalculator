import React, {  useState } from 'react';
import BasicCalculator from '../../components/BasicCalculator';
import EngineeringCalculator from '../../components/EngineeringCalculator';
// import axiosInstance from '../../utils/axios';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const LandingPage = () => {
  const [calculator, setCalculator] = useState('basic');
 
  return (
    <section>
      {/* filter */}
      <div className='flex gap-[300px] bg-gray-100 justify-center p-7 mb-10'>
        <div>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                계산기 카테고리
                <ChevronDownIcon className='-mr-1 h-5 w-5 text-gray-400' aria-hidden='true' />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'>
              <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-1'>
                  <div className='flex px-3'>
                    <input 
                      checked={calculator === 'basic' ? true : false}
                      type='radio'
                      id="basic"
                      value="basic"
                      onChange= {e => setCalculator(e.target.value)}

                    />
                    <label htmlFor="basic" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>기본 계산기</label>
                  </div>
                  <div className='flex px-3'> 
                  <input 
                      checked={calculator === 'engineering' ? true : false}
                      type='radio'
                      id="engineering"
                      value="engineering"
                      onChange= {e => setCalculator(e.target.value)}
                      
                    />
                    <label htmlFor="engineering" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>공학용 계산기</label>
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {/* calculator */}
      <div className=''>
        {calculator === 'basic' ? 
          <BasicCalculator /> : <EngineeringCalculator />
        }
      </div>
    </section>
  );
};

export default LandingPage;
