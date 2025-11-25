import { Injectable } from '@nestjs/common';
import { OpenAIEmbeddings } from '@langchain/openai';
// import { OpenAI } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
// import { createRetrievalChain } from 'langchain/chains/retrieval';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
// import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
// import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";

@Injectable()
export class ChatService {
  private vectorStore: MemoryVectorStore;

  constructor() {
    // this.initVectorStore();
  }

  async initVectorStore() {
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const texts = [
      'BRSR is a framework introduced by SEBI for ESG disclosures.',
      'It is mandatory for the top 1000 listed companies by market cap.',
      'The BRSR framework has disclosures on governance, environmental, and social principles.',
    ];

    const metadata = texts.map((text, index) => ({ id: index }));
    this.vectorStore = await MemoryVectorStore.fromTexts(
      texts,
      metadata,
      embeddings,
    );
  }
  async answerFromVectorStore(question: string): Promise<any> {
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const retriever = this.vectorStore.asRetriever();
    const chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.5,
      modelName: 'gpt-3.5-turbo',
    });

    const response = await chatModel.call([
      new SystemMessage(
        'You are an expert assistant in BRSR (Business Responsibility and Sustainability Reporting). Answer in simple terms with accurate references to BRSR practices.',
      ),
      new HumanMessage(question),
    ]);

    console.log('Response from Vector Store:', response);
    return {
      mode: 'vectorstore',
      question,
      answer: response.text,
    };
  }
  async answerFromOpenAI(question: string): Promise<any> {
    const chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.5,
      modelName: 'gpt-3.5-turbo',
    });

    const messages = [
      new SystemMessage(
        'You are an expert assistant in BRSR (Business Responsibility and Sustainability Reporting). Answer in simple terms with accurate references to BRSR practices.',
      ),
      new HumanMessage(question),
    ];

    const response = await chatModel.call(messages);
    console.log('Response from OpenAI:', response);
    return {
      mode: 'openai',
      question,
      answer: response.text,
    };
  }
}
