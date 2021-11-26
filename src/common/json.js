const syntaxHighlight = (json) => {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function(match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
};
const json = {
  string: '测试超级长的string 00000010101001010100324687928748672879748675268793846762879348676879248676897246789724657874657328927324657289732463572189374687532182937246357238193827463278973286475',
  list: [
    {
      id: '1',
      content: '两只老虎爱跳舞，小兔子乖乖拔萝卜',
      list: [
        {
          id: '1',
          content: '两只老虎爱跳舞，小兔子乖乖拔萝卜',
          list: [
            {
              id: '1',
              content: '两只老虎爱跳舞，小兔子乖乖拔萝卜',
              list: [
                {
                  id: '1',
                  content: '两只老虎爱跳舞，小兔子乖乖拔萝卜'
                },
                {
                  id: '2',
                  content: '我和小鸭子学走路，童年时最美的礼物'
                },
                {
                  id: '3',
                  content: '小螺号呀嘀嘀地吹，我学海鸥展翅飞'
                },
                {
                  id: '4',
                  content: '不怕风雨不怕累，快快把本领都学会'
                }
              ]
            },
            {
              id: '2',
              content: '我和小鸭子学走路，童年时最美的礼物'
            },
            {
              id: '3',
              content: '小螺号呀嘀嘀地吹，我学海鸥展翅飞'
            },
            {
              id: '4',
              content: '不怕风雨不怕累，快快把本领都学会'
            }
          ]
        },
        {
          id: '2',
          content: '我和小鸭子学走路，童年时最美的礼物'
        },
        {
          id: '3',
          content: '小螺号呀嘀嘀地吹，我学海鸥展翅飞'
        },
        {
          id: '4',
          content: '不怕风雨不怕累，快快把本领都学会'
        }
      ]
    },
    {
      id: '2',
      content: '我和小鸭子学走路，童年时最美的礼物'
    },
    {
      id: '3',
      content: '小螺号呀嘀嘀地吹，我学海鸥展翅飞'
    },
    {
      id: '4',
      content: '不怕风雨不怕累，快快把本领都学会'
    }
  ]
}
export { syntaxHighlight, json };