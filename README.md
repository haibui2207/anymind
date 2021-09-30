## # How to start project

Install packages

```bash
npm install
```

Start app

```bash
npm start
```

Run test

```bash
npm run test
```

## # Requirements
- [x] Use Git
- [x] Use TypeScript
- [x] Use React Hooks
- [x] Convert wireframe
- [x] Using Apollo to integrate GraphQL
- [x] Chat with other users
- [x] User can choose username
- [x] User can choose channel
- [x] After user choose a channel, latest messages will be shown (Right side of page)
- [x] Read more button will show more messages
- [x] Sometimes Back-end will return error, so Front-end should handle the Unsent messages
- [x] When users reopen the page, the text editor should keep their text.
- [x] Suggest better UI design (Optional)
- [x] Do not use Redux or others state-management libs, just Context API
- [x] Use CSS-in-JS solutions
- [x] Unit test / Testable
- [x] Responsive

## # Some logics different with requirements
- Channel will only has a button load old messages, this button only show when user scroll on top channel and will be hidden if no old messages to load
- Channel has not load new messages button, new messages will load automatically every 5 seconds
- Handle error only integrated with mutation request, will show small popup below channel to inform to user and keep their message within editor. Rest will show on alert popup
- Message box using CKEditor, all features of Editor are being hidden, you can chat multiple lines, no limitation
- Channel will fetch messages every 5s (fake realtime chatting)
