# CYOA (Choose Your Own Aventure)

Blockchain implementation to hold the story branch paths

# How

- Run gananche (localhost:7456 as default?)

- clone
- ```$ truffle compile ```
- ```$ truffle migrate ```
- ```$ truffle test ```


- Should look like this : 

```$ Using network 'development'  ```
 
 ```deployed to : 0x13274fe19c0178208bcbee397af8167a7be27f6f```


 ``` Contract: StoriesContract
    createStory
      ✓ it should let us create a story (46ms)
      ✓ returns nr of nodes
    ChildNodes
      ✓ adding a new child nodes (116ms)
      ✓ confirm child added (68ms)```


  4 passing (267ms)
```


- Copy the logged contract address

- ```$ node app.js [COPIED ADDRESS] ```

- Output: (Play the example)

```  ==== The start ==== 

[Once upon a time... I woke up and...] 

[0]: I eat breakfast 
[1]: Went to the gym 
Enter your option:   ```

