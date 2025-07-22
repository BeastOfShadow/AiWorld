# 🤖 AiWorld  
**Your private AI playground. Run your own LLMs locally with 100% privacy.**

![.NET Core](https://img.shields.io/badge/.NET%20Core-8.0-blue) ![React](https://img.shields.io/badge/React-18.2.0-blue) ![Platform](https://img.shields.io/badge/platform-Desktop%20App-lightgrey) ![License](https://img.shields.io/badge/License-Apache%202.0-green) ![Status](https://img.shields.io/badge/status-Work%20In%20Progress-yellow) ![Privacy](https://img.shields.io/badge/privacy-100%25%20guaranteed-success) ![Made with ❤️](https://img.shields.io/badge/made%20with-%E2%9D%A4-red)

---

**AiWorld** is our organization's first open-source solution that lets you run your language models (LLMs) **locally on your machine** through a simple interface. All conversations are saved in your private database, ensuring **100% privacy**. Configure any LLM model in seconds via endpoint (we recommend Ollama), with no data sharing with third parties.  

> 🔥 **Work in Progress...** We're implementing advanced AI tool features! Stay tuned!  

---

## 🌟 Why Choose AiWorld?

- 🔒 **Absolute privacy**: All data stays on your machine
- ⚡ **Lightning-fast setup**: Just a model name and endpoint
- 🧠 **Multi-LLM support**: Use different models simultaneously (coming soon)
- 💾 **Persistent history**: All chats saved in a local database
- 🚫 **No subscriptions**: Open-source and self-managed
- 🛡️ **Secure**: No connection to external cloud services

---

## 🛠 Tech Stack

| **Area**       | **Technologies**                                                             |
|----------------|-----------------------------------------------------------------------------|
| **Frontend**   | React, TypeScript, Tailwind CSS, Vite                                    |
| **Backend**    | ASP.NET Core 9, Entity Framework Core                                |
| **Database**   | SQLite (default) / PostgreSQL, SQL Server support                          |
| **AI Runtime** | Compatible with Ollama, llama.cpp, Hugging Face, any OpenAI API endpoint    |

---

## ⚙️ Quick Setup

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- Recommended LLM runtime: [Ollama](https://ollama.ai/)

### Installation Steps

1. **Clone repository**:
 ```bash
 git clone https://github.com/AiWorldOrg/AiWorld.git
 cd AiWorld
 ```
2. **Configure backend**:
Create appsettings.Development.json in AiWorld.API folder:
``` json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=../AiWorld.db"
  }
}
```
3. **Install dependencies**:
```bash
# Backend
dotnet restore
# Frontend
cd client
npm install
Launch application:
bash
# In one terminal: Backend
dotnet run --project AiWorld.API

# In another terminal: Frontend
cd client
npm run dev
```

## 🤝 How to Contribute

Fork the repository
Create feature branch (git checkout -b feature/awesome-feature)
Commit changes (git commit -m 'Add awesome feature')
Push branch (git push origin feature/awesome-feature)
Open Pull Request

## 📄 License

Licensed under MIT. See LICENSE for details.

Privacy by design: AiWorld never sends your data to external servers.
The future of AI is private, decentralized, and under your control. ✊
Let's cook and trust the process! 🔥🍳
