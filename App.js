/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	ImageBackground,
	Image,
	FlatList,
	Button
} from 'react-native';
import styles from './styles';

const App = () => {
	const [loading, setLoading] = useState(true);
	const [articles, setArticles] = useState([]);

	const API_KEY = '07ced389dfe94c4cac4dc0384270d2dd';
	const URL = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;

	useEffect(() => {
		fetch(URL)
			.then(response => response.json())
			.then(responseJson => {
				return responseJson.articles;
			})
			.then(articles => {
				setArticles(articles);
				setLoading(false);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	if (loading) {
		return <SplashScreen />;
	} else {
		return <HomeScreen articles={articles} />;
	}
};

const SplashScreen = () => {
	return (
		<View style={styles.container}>
			<ImageBackground
				style={styles.backgroundImage}
				source={require('./img.jpg')}>
				<View style={styles.logoContainer}>
					<Text style={styles.logoText}>Newzzz</Text>
					<Text style={styles.logoDescription}>
						Get your doze of daily news!
					</Text>
				</View>
			</ImageBackground>
		</View>
	);
};

const HomeScreen = ({ articles }) => {
	return (
		<View style={styles.container}>
			<FlatList
				style={styles.list}
				keyExtractor={(item, index) => index.toString()}
				data={articles}
				renderItem={({ item }) => <ArticleItem article={item} />}
			/>
		</View>
	);
};

const ArticleItem = ({ article }) => {
	const { description, title, url, urlToImage } = article;
	return (
		<View style={styles.articleContainer}>
			<Image style={styles.articleImage} source={{ uri: urlToImage }} />
			<Text style={styles.articleTitle}>{title}</Text>
			<Text style={styles.articleDescription}>{description}</Text>
			<View style={styles.articleBtns}>
				<Button
					onPress={() => {
						console.log('Button pressed!');
					}}
					title="Open"
				/>
				<Button
					onPress={() => {
						console.log('Button pressed!');
					}}
					title="Read Later"
				/>
			</View>
		</View>
	);
};

export default App;
