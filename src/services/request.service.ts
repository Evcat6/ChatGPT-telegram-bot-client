import { Configuration, OpenAIApi } from 'openai'
import * as dotenv from 'dotenv'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const createRequest = async (prompt: string): Promise<string | undefined> => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 64,
    temperature: 0,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0
  })

  return response.data.choices[0].text
}

export { createRequest }
