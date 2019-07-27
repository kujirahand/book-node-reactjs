start
  = sentence*

sentence
  = title
  / list
  / blockquote
  / link
  / nop
  / text
  / eos

title
  = "*" label:$(!EOL .)+ EOL
  { return {tag: "h2", label} }

list
  = items:list_item+
  { return {tag:"ul", items} }

list_item
  = "-" label:$([^\n]*) "\n"
  { return label }

blockquote
  = ">" label:$(!EOL .)+ EOL
  { return {tag:"blockquote", label} }

link
  = "@" label:$([^\n]+) "\n"
  { return {tag: "a", label} }

text
  = label:$(!EOL .)+ EOL
  { return {tag: "p", label} }

nop
  = "\n"+ { return {tag: "p", label:''} }

eos
  = label:$(.+)
  { return {tag: "p", label} }

EOL = "\n" "\n"
