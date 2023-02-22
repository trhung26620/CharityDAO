import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { performContribute } from '../Blockchain.services'
import { setGlobalState, useGlobalState } from '../store'


const Banner = () => {
    const [amount, setAmount] = useState('')
    const [isStackholder] = useGlobalState('isStackholder')
    const [balance] = useGlobalState('balance')
    const [mybalance] = useGlobalState('mybalance')

    const onContribute = async () => {
        if (!amount || amount == '') return
        await performContribute(amount)
        toast.success('Contribution received')
        setAmount('')
    }

    return (
        <div className="p-8">
            <h2 className="font-semibold text-3xl mb-5">
                {5} Proposals Currently Opened
            </h2>
            <p>
                Current DAO Balance: {' '}
                <strong>{balance} ETH</strong> <br />
                Your Contributions: {' '}
                <span>
                    <strong>{mybalance} ETH</strong>
                    {isStackholder ? ', and you are now a stakerholder' : null}
                </span>
            </p>
            <hr className="my-6 border-gray-300 dark:border-gray-500" />
            <p>
                {isStackholder ?
                    'You can now raise proposals on this platform' :
                    'Hey, when you contribute up to 1 ETH you become a stakeholder'
                }
            </p>
            <div className='flex flex-row justify-start items-center md:w-1/3 w-full mt-4'>
                <input
                    type="number"
                    className="form-control block w-full px-3 py-1.5
          text-base font-normaltext-gray-700
          bg-clip-padding border border-solid border-gray-300
          rounded transition ease-in-out m-0 shadow-md
          focus:text-gray-500 focus:outline-none
          dark:border-gray-500 dark:bg-transparent"
                    placeholder="e.g 2.5 Eth"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    required
                />
            </div>
            <div className='flex flex-row justify-start items-center space-x-3 mt-4'>
                <button
                    type="button"
                    className={`inline-block px-6 py-2.5
          bg-blue-600 text-white font-medium text-xs
          leading-tight uppercase shadow-md rounded-full
          hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
          focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg transition
          duration-150 ease-in-out dark:text-blue-500
          dark:border dark:border-blue-500 dark:bg-transparent`}
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    onClick={onContribute}
                >
                    Contribute
                </button>
                {isStackholder ? (
                    <button
                        type="button"
                        className={`inline-block px-6 py-2.5
        bg-blue-600 text-white font-medium text-xs
        leading-tight uppercase shadow-md rounded-full
        hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
        focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-blue-800 active:shadow-lg transition
        duration-150 ease-in-out dark:text-blue-500
        dark:border dark:border-blue-500 dark:bg-transparent`}
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        onClick={() => setGlobalState('createModal', 'scale-100')}
                    // onClick={onPropose}
                    >
                        Propose
                    </button>
                ) :
                    null
                }

            </div>
        </div>
    )
}

export default Banner