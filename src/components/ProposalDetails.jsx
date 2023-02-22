import React from 'react'
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
} from 'recharts'
const ProposalDetails = () => {
    return (
        <div className="p-8">
            <h2 className="font-semibold text-3xl mb-5">
                {/* {proposal?.title} */}
                Title
            </h2>
            <p>
                This proposal is to payout <strong>
                    {/* {proposal?.amount} */}
                    4 Eth</strong> and
                currently have{' '}
                <strong>
                    {/* {proposal?.upvotes + proposal?.downvotes} */}
                    5 votes</strong> and
                will expire in
                <strong>
                    {/* {daysRemaining(proposal?.duration)} */}
                    12
                </strong>
            </p>
            <hr className="my-6 border-gray-300" />
            {/* <p>{proposal?.description}</p> */}
            <div className="flex flex-row justify-start items-center w-full mt-4 overflow-auto">
                <BarChart width={730} height={250}
                    // data={data}
                    data={null}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Acceptees" fill="#2563eb" />
                    <Bar dataKey="Rejectees" fill="#dc2626" />
                </BarChart>
            </div>
            <div
                className="flex flex-row justify-start items-center space-x-3 mt-4"
                role="group"
            >
                {/* {isStakeholder ? ( */}
                <>
                    <button
                        type="button"
                        className="inline-block px-6 py-2.5
            bg-blue-600 text-white font-medium text-xs
              leading-tight uppercase rounded-full shadow-md
              hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
              focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-blue-800 active:shadow-lg transition
              duration-150 ease-in-out dark:text-gray-300
              dark:border dark:border-gray-500 dark:bg-transparent"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                    //   onClick={() => onVote(true)}
                    >
                        Accept
                    </button>
                    <button
                        type="button"
                        className="inline-block px-6 py-2.5
            bg-blue-600 text-white font-medium text-xs
              leading-tight uppercase rounded-full shadow-md
              hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
              focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-blue-800 active:shadow-lg transition
              duration-150 ease-in-out
              dark:border dark:border-gray-500 dark:bg-transparent"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                    //   onClick={() => onVote(false)}
                    >
                        Reject
                    </button>
                </>
                {/* ) : null} */}
            </div>
        </div>
    )
}

export default ProposalDetails