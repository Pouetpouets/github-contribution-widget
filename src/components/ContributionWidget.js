// ContributionWidget.js
import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

const DAYS_IN_WEEK = 7;
const WEEKS_TO_SHOW = 53;
const SQUARE_SIZE = 10;
const SQUARE_SPACING = 2;

const ContributionWidget = ({ username }) => {
  const [contributions, setContributions] = useState([]);
  
  useEffect(() => {
    fetchContributions();
  }, [username]);

  const fetchContributions = async () => {
    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${YOUR_GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables: { username } }),
      });

      const data = await response.json();
      setContributions(processContributions(data));
    } catch (error) {
      console.error('Error fetching contributions:', error);
    }
  };

  const processContributions = (data) => {
    return data.data.user.contributionsCollection.contributionCalendar.weeks;
  };

  const getContributionColor = (count) => {
    if (count === 0) return '#ebedf0';
    if (count <= 3) return '#9be9a8';
    if (count <= 6) return '#40c463';
    if (count <= 9) return '#30a14e';
    return '#216e39';
  };

  return (
    <View style={styles.container}>
      <Svg
        width={WEEKS_TO_SHOW * (SQUARE_SIZE + SQUARE_SPACING)}
        height={DAYS_IN_WEEK * (SQUARE_SIZE + SQUARE_SPACING)}
      >
        {contributions.map((week, weekIndex) => (
          week.contributionDays.map((day, dayIndex) => (
            <Rect
              key={`${weekIndex}-${dayIndex}`}
              x={weekIndex * (SQUARE_SIZE + SQUARE_SPACING)}
              y={dayIndex * (SQUARE_SIZE + SQUARE_SPACING)}
              width={SQUARE_SIZE}
              height={SQUARE_SIZE}
              fill={getContributionColor(day.contributionCount)}
              rx={2}
            />
          ))
        ))}
      </Svg>
    </View>
  );
};

const styles = {
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
};

export default ContributionWidget;