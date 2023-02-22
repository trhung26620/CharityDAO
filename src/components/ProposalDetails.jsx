import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
} from 'recharts'
import { getProposal, voteOnProposal } from '../Blockchain.services'
import { daysRemaining, setAlert, setLoadingMsg, useGlobalState } from '../store'

const ProposalDetails = () => {
    const { id } = useParams()
    const [proposal, setProposal] = useState(null)
    const [data, setData] = useState([])
    const [isStakeholder] = useGlobalState('isStakeholder')

    const retreiveProposal = async () => {
        await getProposal(id).then((res) => {
            setProposal(res)
            setData([
                {
                    name: 'Voters',
                    Acceptees: res?.upvotes,
                    Rejectees: res?.downvotes,
                }
            ])
        })
    }

    const onVote = async (choice) => {
        if (new Date().getTime() > Number(proposal.duration + '000')) {
            setLoadingMsg('Voting...')
            setAlert("Proposal expired!", "red")
        } else {
            setLoadingMsg('Voting...')
            try {
                await voteOnProposal(id, choice);
                setAlert("Voted Successfully")
            } catch (error) {
                setAlert("Vote failed!", "red")
            }
        }
    }

    useEffect(() => {
        retreiveProposal()
    }, [])

    return (
        <div className="p-8">
            <h2 className="font-semibold text-3xl mb-5">
                {proposal?.title}
            </h2>
            <p>
                This proposal is to payout <strong>
                    {proposal?.amount}
                    {' ETH'}</strong> and
                currently have{' '}
                <strong>
                    {proposal?.upvotes + proposal?.downvotes}{' '}
                    votes</strong> and
                will expire in {' '}
                <strong>
                    {daysRemaining(proposal?.duration)}
                </strong>
            </p>
            <hr className="my-6 border-gray-300" />
            <p>{proposal?.description}</p>
            <div className="flex flex-row justify-start items-center w-full mt-4 overflow-auto">
                <BarChart width={730} height={250}
                    data={data}
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
                {isStakeholder ? (
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
                            onClick={() => onVote(true)}
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
                            onClick={() => onVote(false)}
                        >
                            Reject
                        </button>
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default ProposalDetails