import React, { useState } from "react"
import { Card } from "./Card"
import Popup from "./Popup"


export default function Converter() {
  const NEP_TO_BUSD  = 3
  const [ nep, setNep ] = useState(0)
	const [ showPopup, setShowPopup ] = useState(false)

	const onChangeNep = (e : any) => setNep(parseFloat(e.target.value))
	const onChangeBusd = (e : any) => setNep(parseFloat(e.target.value) / NEP_TO_BUSD)
	const closeModal = () => setShowPopup(!showPopup)

  return (
		<>
			<Card>
				<span
					style={{ 
						fontSize: '2rem', 
						fontWeight: 'bold' 
					}}
				>
					Crypto converter
				</span>
				<div 
					style={{ 
						display: 'flex', 
						flexDirection: 'column' 
					}}
				>
					<span>NEP</span>
					<input 
						type="number" 
						value={nep} 
						onChange={ onChangeNep } 
					/>
				</div>
				<button 
					style={{ 
						width: '2rem', 
						alignSelf: 'center' 
					}} 
					onClick={() => setNep(0)}
				>
					↻
				</button>
				<div 
					style={{ 
						display: 'flex', 
						flexDirection: 'column' 
					}
				}>
					<span>BUSD</span>
					<input 
						type="number" 
						value={nep * NEP_TO_BUSD} 
						onChange={ onChangeBusd } 
					/>
				</div>
				<button 
					style={{ 
						width: '12rem', 
						alignSelf: 'center' 
					}} 
					onClick={ closeModal }
				>
					Check Wallet Details
				</button>
			</Card>
			{showPopup && <div 
				style={{ 
					position: 'fixed', 
					top: 0, 
					left: 0, 
					width: '100vw', 
					height: '100vh', 
					zIndex: 10, 
					display: 'flex', 
					justifyContent: 'center', 
					alignItems: 'center', 
					backgroundColor: 'rgba(0, 0, 0, 0.8)' 
				}}
			>
				<Popup 
					close={ closeModal } 
				/>
			</div>}
		</>
  )
}
