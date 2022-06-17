import React from 'react';
import LEAGUE_OPTIONS from '../../constants/league-options.constant';

import firebase from '../../firebase/config';

export const MatchesScript = () => {
	const scripting = async (league) => {
		try {
			console.log('STARTING...');
			const { docs: currentMatches } = await firebase.db
				.collection(league)
				.orderBy('date', 'desc')
				.get();
			const currentMatchesTransform = currentMatches.map((doc) => ({
				...doc.data(),
				id: doc.ref.id,
				streams: [{
					label: 'Goals',
					frame: doc.data().frame
				}],
			}));
			const promisesMatches = currentMatchesTransform.map((item) =>
				firebase.db.collection(league).doc(item.id).set(item, { merge: true })
			);
			await Promise.all(promisesMatches);
			alert(`DONE ${promisesMatches.length} matches updated`);
		} catch (error) {
			console.log({
				error,
			});
		}
	};

	return (
		<div>
			{LEAGUE_OPTIONS.map((league) => (
				<button onClick={() => scripting(league.value)}>{league.name}</button>
			))}
		</div>
	);
};
