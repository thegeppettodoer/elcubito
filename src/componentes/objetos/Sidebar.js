import React from 'react'

import styled from 'styled-components/native'

const Container = styled.View`
	width: 60px;
	height: 100%;
	padding-bottom: 59px;
	justify-content: center;
`
const Menu = styled.View`
	margin: 9px 0;
	align-items: center;
`
const User = styled.View`
	width: 48px;
	height: 48px;
	margin-bottom: 13px;
`
const Avatar = styled.Image`
	width: 100%;
	height: 100%;
	border-radius: 48px;
	border-width: 2px;
	border-color: #ffffff;
`
const Icon = styled.Image`
	height: 40px;
`
const Count = styled.Text`
	color: #fff;
	font-size: 12px;
	letter-spacing: -0.1px;
`
const SoundBg = styled.View`
	background: #1f191f;
	width: 50px;
	height: 50px;
	border-radius: 50px;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
`
const Sound = styled.Image`
	width: 25px;
	height: 25px;
	border-radius: 25px;
`

const Sidebar = ({ avatar, count , kei }) => {
	return (
		<Container key={kei}>
		 
		</Container>
	)
}

export default Sidebar;