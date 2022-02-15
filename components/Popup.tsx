import React, { useState, useEffect } from 'react'
import type { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'

import { hooks, metaMask } from '../connectors/metaMask'
import { Card } from './Card'

const { useChainId, useAccounts, useIsActive, useProvider, useENSNames } = hooks

type Props = {
  close: React.MouseEventHandler<HTMLButtonElement>
};

export default function Popup({ close }: Props) {
  const chainId = useChainId()
  const accounts = useAccounts()
  const isActive = useIsActive()
  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  const [balances, setBalances] = useState<BigNumber[] | undefined>()

	useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false

      void Promise.all(accounts.map((account) => provider.getBalance(account)))
				.then((balances) => {
					if (!stale) {
						setBalances(balances)
					}
				}
			)

      return () => {
        stale = true
        setBalances(undefined)
      }
    }
  }, [provider, accounts])

	const formatAddress = (address: string) => `${address.slice(0, 4)}....${address.slice(-4)}`

  return (
    <Card>
			<div 
				style={{ 
					display: 'flex', 
					justifyContent: 'space-between', 
					alignItems: 'center' 
				}}
			>
      	<span 
					style={{ 
						fontSize: '2rem', 
						fontWeight: 'bold' 
					}}
				>
					Wallet details
				</span>
				<button onClick={close}>✖</button>
			</div>
			<div 
				style={{ 
					display: 'flex', 
					flexDirection: 'column', 
					alignItems: 'center', 
					gap: '1rem' 
				}}
			>
				{isActive ? <>
					<div 
						style={{ 
							width: '100%', 
							display: 'flex', 
							justifyContent: 'space-between' 
						}}
					>
						<span>KEY</span>
						<span>VALUE</span>
					</div>
					<div 
						style={{ 
							width: '100%', 
							display: 'flex', 
							justifyContent: 'space-between' 
						}}
					>
						<span>Account</span>
						{accounts && <span>
							{formatAddress(ENSNames?.[0] ?? accounts[0])}
						</span>}
					</div>
					<div 
						style={{ 
							width: '100%', 
							display: 'flex', 
							justifyContent: 'space-between' 
						}}
					>
						<span>Chain ID</span>
						<span>{chainId}</span>
					</div>
					<div 
						style={{ 
							width: '100%', 
							display: 'flex', 
							justifyContent: 'space-between' 
						}}
					>
						<span>Balance</span>
						{balances && <span>
							{balances?.[0] ? `${formatEther(balances[0])}` : null}
						</span>}
					</div>
					<button 
						onClick={() => metaMask.deactivate()} 
						style={{ 
							width: '100%', 
							borderRadius: '1rem', 
							backgroundColor: 'red', 
							color: 'white' 
						}}
					>
						Disconnect
					</button>
				</> : <>
					<span 
						style={{ 
							color: 'red' 
						}}
					>
						Wallet not connected. Please click the "Connect Now" button below
					</span>
					<div 
						style={{ 
							width: '100%', 
							display: 'flex', 
							justifyContent: 'space-between', 
							gap: '1rem' 
						}}
					>
						<button 
							style={{ 
								width: '100%', 
								borderRadius: '1rem', 
								backgroundColor: 'blue', 
								color: 'white' 
							}} 
							onClick={() => metaMask.activate(chainId)}
						>
							Connect
						</button>
						<button 
							style={{ 
								width: '100%', 
								borderRadius: '1rem', 
								backgroundColor: 'gray', 
								color: 'white' 
							}} 
							onClick={close}
						>
							Cancel
						</button>
					</div>
				</>}
			</div>
    </Card>
  )
}
