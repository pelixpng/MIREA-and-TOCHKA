import React, { FC } from 'react'
import { DelimiterContainer, MainButtonTitle } from '../../UniversalComponents'

export const WeekDayItem: FC<{ Day: string }> = ({ Day }) => {
	return (
		<DelimiterContainer>
			<MainButtonTitle>{Day}</MainButtonTitle>
		</DelimiterContainer>
	)
}
