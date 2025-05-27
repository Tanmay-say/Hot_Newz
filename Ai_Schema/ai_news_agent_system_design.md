# AI News Agent System Design

## Implementation approach

Based on the PRD requirements, we need to create a scalable, reliable system that sources AI technology news, processes it according to user preferences, and delivers timely updates via WhatsApp and SMS. The system will be designed with the following key considerations:

### Architecture Style
- **Microservices Architecture**: This allows for independent scaling of different components, better fault isolation, and easier maintenance.
- **Event-driven Design**: Critical for real-time news processing and delivery pipelines.
- **Cloud-native Implementation**: Leveraging managed services for optimal reliability and scalability.

### Technology Stack

1. **Backend Services**:
   - **Language**: Python (excellent for data processing, ML tasks, and backend services)
   - **Framework**: FastAPI for RESTful APIs (high performance, async support)
   - **Message Broker**: Apache Kafka for event streaming (reliable message delivery, high throughput)
   - **Containerization**: Docker with Kubernetes orchestration

2. **Data Storage**:
   - **User Data**: PostgreSQL (relational database for structured user preferences)
   - **Content Storage**: MongoDB (document storage for news articles and metadata)
   - **Caching**: Redis (in-memory caching for frequent queries and rate limiting)

3. **News Processing**:
   - **NLP Libraries**: spaCy, HuggingFace Transformers for content analysis
   - **Summarization**: BART or T5 models for generating concise news summaries
   - **Classification**: DistilBERT for topic categorization

4. **Integration Services**:
   - **WhatsApp**: WhatsApp Business API via official client libraries
   - **SMS**: Twilio API for SMS delivery
   - **News Sources**: NewsAPI, GDELT, custom scrapers with Beautiful Soup

5. **Frontend**:
   - **Web Portal**: React.js with Tailwind CSS
   - **Authentication**: JWT with OAuth 2.0

6. **DevOps & Monitoring**:
   - **CI/CD**: GitHub Actions
   - **Monitoring**: Prometheus with Grafana dashboards
   - **Logging**: ELK stack (Elasticsearch, Logstash, Kibana)

### Difficult Points & Solutions

1. **News Freshness vs. Processing Quality**:
   - **Challenge**: Balancing speed of delivery with quality of content processing
   - **Solution**: Implement a two-phase delivery system where breaking news gets expedited processing with basic filtering, followed by more comprehensive processing for detailed insights

2. **Content Deduplication**:
   - **Challenge**: Same news appearing across multiple sources
   - **Solution**: Implement semantic similarity detection using sentence embeddings rather than simple text matching

3. **User Preference Learning**:
   - **Challenge**: Accurately learning user preferences without explicit feedback
   - **Solution**: Combine explicit preferences with implicit signals (click-through rates, reading time estimates)

4. **Message Delivery Reliability**:
   - **Challenge**: Ensuring messages are delivered despite network issues
   - **Solution**: Implement delivery confirmation, retry logic, and fallback between channels

5. **Scaling for Breaking News**:
   - **Challenge**: System load spikes during major AI announcements
   - **Solution**: Implement auto-scaling based on queue depths and processing latency metrics

### Open Source Libraries

- **BeautifulSoup/Scrapy**: Web scraping for news sources without APIs
- **HuggingFace Transformers**: NLP tasks including summarization and classification
- **Apache Airflow**: Workflow orchestration for scheduled news collection
- **FastText/Word2Vec**: Efficient text vectorization for content similarity
- **Pydantic**: Data validation for APIs
- **Celery**: Distributed task queue for background processing
- **Pytest**: Testing framework

## Data structures and interfaces

The system's core data structures and interfaces are designed to handle user preferences, news content, and delivery mechanisms efficiently. The key components and their relationships are defined in the class diagram (ai_news_agent_class_diagram.mermaid).

The main classes include:

1. **User**: Represents a subscriber with their preferences, notification settings, and subscription status.
2. **NewsArticle**: Contains all article metadata, content, and derived features like relevance scores.
3. **NewsCollector**: Manages the collection of news from multiple sources.
4. **ContentProcessor**: Handles NLP tasks including summarization, classification, and duplicate detection.
5. **DeliveryManager**: Orchestrates the delivery of notifications across different channels.
6. **WhatsAppHandler & SMSHandler**: Handle channel-specific formatting and delivery.
7. **UserManager**: Manages user accounts, preferences, and subscription changes.
8. **CommandProcessor**: Processes user commands received via messaging channels.
9. **WebPortal**: Provides a web interface for detailed subscription management.

Each class is designed with clear responsibilities and interfaces that enable modular development and testing.

## Program call flow

The system operates through several key flows, detailed in the sequence diagram (ai_news_agent_sequence_diagram.mermaid). The main workflows include:

1. **User Registration Flow**:
   - User initiates subscription via WhatsApp/SMS
   - System guides through topic selection and frequency preferences
   - User account is created with initial preferences

2. **News Collection Flow**:
   - Scheduled collection from various sources
   - Processing pipeline for summarization, classification, and deduplication
   - Storage of processed articles in the database

3. **News Delivery Flow**:
   - Selection of eligible users based on preferences and timing
   - Matching relevant articles to user interests
   - Channel-specific formatting and delivery
   - Tracking of delivery status

4. **User Interaction Flow**:
   - Processing of user commands (pause, help, etc.)
   - Handling subscription changes
   - Providing immediate feedback

5. **User Preference Update Flow**:
   - Receiving and processing settings change requests
   - Updating user preferences
   - Confirming changes

6. **Analytics Flow**:
   - Tracking user engagement metrics
   - Analyzing content performance
   - Generating insights for system optimization

## Anything UNCLEAR

1. **Rate Limiting Policies**: The PRD doesn't specify exact rate limiting requirements for messaging channels. We need to clarify WhatsApp Business API limits and their impact on delivery scheduling.

2. **Content Licensing**: Further clarification needed on the legal aspects of redistributing news content from various sources, especially for premium tier services.

3. **Fallback Mechanisms**: While we've designed for delivery reliability, specific fallback policies when both WhatsApp and SMS fail need to be defined.

4. **Retention Policy**: The system will collect and process news articles continuously. A clear policy for data retention and archiving old content needs to be established.

5. **Emergency Broadcast Protocol**: For critical AI news that impacts many users, should we have a special protocol that bypasses some personalization filters?

6. **Monetization Integration**: If implementing a freemium model as suggested in the PRD, payment processing integration details would need to be specified.

7. **Content Moderation**: While focusing on reputable sources reduces risks, an explicit content moderation strategy might be necessary for certain controversial AI topics.