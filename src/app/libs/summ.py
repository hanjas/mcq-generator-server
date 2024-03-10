from summarizer import Summarizer

class Summ:
  def summarize(self, text):
    model = Summarizer()
    result = model(text, min_length=60)
    return result