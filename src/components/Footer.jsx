import React from 'react'
import { BsLinkedin, BsGithub } from 'react-icons/bs'
import {FaUser} from 'react-icons/fa'

const Footer = () => {
  return (
		<>
			<div></div>
			<div className="footer d-flex justify-content-center py-2 align-items-center">
				<span className='text-white pt-1'>Created by JakeServin&nbsp;&nbsp;</span>
				<a
					href="https://github.com/JakeServin"
					target="blank"
					type="button"
					style={{ color: "white" }}
				>
					<BsGithub size={22} />
				</a>
				<a
					href="https:/linkedIn.com/in/JakeServin"
					target="blank"
					type="button"
					className="mx-3"
					style={{ color: "white" }}
				>
					<BsLinkedin size={22} />
				</a>
				<a
					href="https://jakeservin.dev"
					target="blank"
					type="button"
					style={{ color: "white" }}
				>
					<FaUser size={22} style={{ color: "white" }} />
				</a>
			</div>
		</>
  );
}

export default Footer