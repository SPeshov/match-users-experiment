import Image from 'next/image';
// import MultiStep from 'react-multistep';

import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import { Person } from './api/person';

// import { StepOne } from '@/components/stepOne';
// import { StepTwo } from '@/components/stepTwo';

// Input:
// We ask them about their interests, availability, English confidence level, location,
// Matching on:
// matching  similar interests, availability, etc.
// We also record data about what was the topic of the events that they took part in, who else was in those events, etc.

// const steps = [
//   { name: `Name`, component: <StepOne /> },
//   { name: `Name`, component: <StepTwo /> },
// ];

export default function Home() {
  const [data, setData] = useState<[string, number][]>([]);

  const mockUserData: Person = {
    name: `Robert Galusha`,
    pos: [29.713645, -95.534338],
    tags: [`vast`, `depressed`],
    level: 2,
    availability: 1,
  };
  const [userData, setUserData] = useState<Person>();

  const postData = async (person: Person) => {
    try {
      const response = await fetch(`/api/person`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
        },
        body: JSON.stringify({ person }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const people = await response.json();
      setData(people.usersToFollow);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitData = () => {
    setUserData(mockUserData);
    postData(mockUserData);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p>User input:</p>
        <p>{JSON.stringify(userData)}</p>
        <button onClick={() => handleSubmitData()}>Submit user data</button>
        <p>Users to follow:</p>
        {data.length > 0 ? (
          <div style={{ textAlign: `center` }}>
            <div
              style={{
                marginTop: `1rem`,
                display: `flex`,
                justifyContent: `center`,
              }}
            >
              {data.map((person, index) => (
                <span
                  key={index}
                  style={{
                    padding: `5px 10px`,
                    border: `1px solid black`,
                  }}
                >{`${person[0]} / ${person[1]}`}</span>
              ))}
            </div>
          </div>
        ) : null}
        {/* <MultiStep steps={steps} /> */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=typescript-nextjs-starter"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{` `}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
