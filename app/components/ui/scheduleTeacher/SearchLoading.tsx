import React, { FC, useEffect, useRef } from 'react'
import { Animated, Text, View } from 'react-native'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'

export const SearchLoading: FC<{ state: string }> = ({ state }) => {
	const anim = useRef(new Animated.Value(1))
	useEffect(() => {
		// makes the sequence loop
		if (state.includes('Ищу')) {
			Animated.loop(
				// runs given animations in a sequence
				Animated.sequence([
					// increase size
					Animated.timing(anim.current, {
						toValue: 1.2,
						duration: 700,
						useNativeDriver: true
					}),
					// decrease size
					Animated.timing(anim.current, {
						toValue: 1,
						duration: 700,
						useNativeDriver: true
					})
				])
			).start()
		} else {
			Animated.loop(
				// runs given animations in a sequence
				Animated.sequence([
					// increase size
					Animated.timing(anim.current, {
						toValue: 1.2,
						duration: 800,
						useNativeDriver: true
					}),
					// decrease size
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
	color: #212525;
	width: auto;
	height: auto;
	font-weight: 500;
	font-size: 20px;
	text-align: center;
`
