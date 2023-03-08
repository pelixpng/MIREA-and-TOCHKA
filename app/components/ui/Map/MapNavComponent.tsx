import { FC } from 'react'
import styled from 'styled-components/native'

export const LabelNav: FC<{ name: string; focused: boolean }> = ({
	name,
	focused
}) => {
	return (
		<Headercontainer testID={focused ? '#fa9292' : '#e9e9e9'}>
			<TypeMapText testID={focused ? '#212525' : '#ADADAE'}>{name}</TypeMapText>
		</Headercontainer>
	)
}

const Headercontainer = styled.View`
	align-items: center;
	width: auto;
	height: auto;
	background: ${props => props.testID};
	border-radius: 16px;
`

const TypeMapText = styled.Text`
	text-align: center;
	min-height: auto;
	min-width: auto;
	font-weight: 600;
	font-size: 20px;
	/* font-size: 20;
	font-weight: bold; */
	color: ${props => props.testID};
	margin-right: 4%;
	margin-left: 4%;
	margin-top: 4%;
	margin-bottom: 4%;
`
