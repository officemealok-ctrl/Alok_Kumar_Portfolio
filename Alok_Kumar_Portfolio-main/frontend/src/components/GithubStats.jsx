import React, { useEffect, useState } from 'react';
import { getGithubUser } from '../utils/githubAPI';
import { profile } from '../data/profile';
import { FiUsers, FiBookOpen, FiCode } from 'react-icons/fi';

export default function GithubStats() {
  const [data, setData] = useState(null);
  const username = profile.github;

  useEffect(() => {
    async function load() {
      try {
        const d = await getGithubUser(username);
        setData(d);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [username]);

  return (
    <section
      id="github"
      className="w-full py-24 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          GitHub <span className="bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent bg-clip-text">Stats</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          My live GitHub stats including repositories, followers, and contributions.
        </p>
      </div>

      { !data && <div className="text-center text-gray-600 dark:text-gray-300">Loading GitHub data...</div> }

      { data && (
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 flex-wrap">
          
          {/* Profile Card */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col items-center w-80 transition-transform hover:-translate-y-2 hover:shadow-2xl">
            <img
              src={data.avatar_url}
              alt="GitHub avatar"
              className="w-24 h-24 rounded-full mb-4"
            />
            <div className="text-lg font-bold text-gray-900 dark:text-white">{data.name || data.login}</div>
            <a
              href={data.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1"
            >
              View on GitHub
            </a>
          </div>

          {/* Stats Cards */}
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-6 w-64 flex flex-col items-center hover:-translate-y-2 hover:shadow-2xl transition-transform">
              <FiBookOpen className="text-3xl text-cyan-500 mb-2" />
              <div className="text-xl font-bold">{data.public_repos}</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">Public Repos</div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-6 w-64 flex flex-col items-center hover:-translate-y-2 hover:shadow-2xl transition-transform">
              <FiUsers className="text-3xl text-violet-500 mb-2" />
              <div className="text-xl font-bold">{data.followers}</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">Followers</div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-6 w-64 flex flex-col items-center hover:-translate-y-2 hover:shadow-2xl transition-transform">
              <FiCode className="text-3xl text-green-500 mb-2" />
              <div className="text-xl font-bold">{data.following}</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">Following</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
