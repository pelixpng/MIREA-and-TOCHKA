import React, { FC, useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import { TextForLoading } from '../../../types/FindTeacher.types'
import { BackgroundContainer } from '../../UniversalComponents'

export const SearchLoading: FC<{ state: TextForLoading }> = ({ state }) => {
	const anim = useRef(new Animated.Value(1))
	useEffect(() => {
		if (state.includes('Ищу')) {
			Animated.loop(
				Animated.sequence([
					Animated.timing(anim.current, {
						toValue: 1.2,
						duration: 700,
						useNativeDriver: true
					}),
					Animated.timing(anim.current, {
						toValue: 1,
						duration: 700,
						useNativeDriver: true
					})
				])
			).start()
		} else {
			Animated.loop(
				Animated.sequence([
					Animated.timing(anim.current, {
						toValue: 1.2,
						duration: 800,
						useNativeDriver: true
					}),
					Animated.timing(anim.current, {
						toValue: 1,
						duration: 800,
						useNativeDriver: true
					})
				])
			).stop()
		}
	}, [state])
	return (
		<BackgroundContainer height='100%'>
			<Animated.View
				style={{
					transform: [{ scale: anim.current }],
					marginTop: '10%',
					alignSelf: 'center'
				}}
			>
				<Ionicons name='search-outline' size={52} color='#adadae' />
			</Animated.View>
			<SearchText>{state}</SearchText>
		</BackgroundContainer>
	)
}

const SearchText = styled.Text`
	margin-top: 2%;
	color: #adadae;
	width: auto;
	height: auto;
	font-weight: 400;
	font-size: 20px;
	text-align: center;
`
