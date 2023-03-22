import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'

export const NoPair: FC = () => {
	return (
		<NoPairContainer>
			<Ionicons name='ios-happy-outline' size={100} color='#adadae' />
			<NoPairText>Пар нет!</NoPairText>
		</NoPairContainer>
	)
}

const NoPairContainer = styled.View`
	//align-items: center;
	/* position: absolute;
	top: 50%; */
	align-items: center;
	margin-top: 40%;
`
const NoPairText = styled.Text`
	font-size: 40;
	color: 'rgba(173, 173, 174, 1)';
`
