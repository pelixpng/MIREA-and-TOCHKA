import React, { FC, useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import { TextForLoading } from '../../../types/FindTeacher.types'

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
		<SearchContainer>
			<Animated.View
				style={{
					transform: [{ scale: anim.current }],
					marginTop: '10%'
				}}
			>
				<Ionicons name='search-outline' size={52} color='#adadae' />
			</Animated.View>
			<SearchText>{state}</SearchText>
		</SearchContainer>
	)
}

const SearchContainer = styled.View`
	width: 100%;
	height: 100%;
	align-items: center;
	background: #e9e9e9;
`
const SearchText = styled.Text`
	margin-top: 2%;
	color: #adadae;
	width: auto;
	height: auto;
	font-weight: 500;
	font-size: 20px;
	text-align: center;
`
