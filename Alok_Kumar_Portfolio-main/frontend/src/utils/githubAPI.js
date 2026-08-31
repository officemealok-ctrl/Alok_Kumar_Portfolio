import axios from 'axios'
export async function getGithubUser(username){
  if(!username) username = 'YOUR_GITHUB_USERNAME'
  const url = `https://api.github.com/users/${username}`
  const resp = await axios.get(url)
  return resp.data
}
