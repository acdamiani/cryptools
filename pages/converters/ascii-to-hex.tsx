import Area from '@/components/Area/area';
import Converter, {
  ConverterProperties,
  SelectOptions,
  SelectAbbr,
} from '@/components/Converter/converter';
import TextConverter from '@/src/converters/text';
import { useRouter } from 'next/router';

export default function AsciiToHex() {
  const router = useRouter();

  const convert = (input: string, props: ConverterProperties): string => {
    if (!input) {
      return ``;
    }

    const tc = new TextConverter(input);
    const del = props.delimiter ?? ``;

    let ret = tc.to(`hex`).delimit(del);

    if (props.prefix) {
      ret = `0x` + del + ret;
    }

    return ret;
  };

  const navigate = (from: SelectOptions, to: SelectOptions): void => {
    const url = `/converters/${SelectAbbr[from]}-to-${SelectAbbr[to]}`;

    if (router.pathname === url) {
      return;
    }

    router.push(url);
  };

  return (
    <>
      <h1>ASCII to Hex Converter</h1>
      <Area>
        <Converter convert={convert} onTargetsChange={navigate} />
      </Area>
      <main>
        <h2>Converting ASCII to Hex</h2>
        <p>
          ASCII is one of the oldest character encodings, allowing for
          computerse to represent binary numbers as text. Due to hardware
          limitations at the time of its inception, ASCII has only 128 code
          points, and only 95 of them are printable characters. For this reason,
          most modern computers use UTF-8, which represents the millions of code
          points covered by Unicode. However, UTF-8 has the same first 128 code
          points as ASCII, making compatibility a non-issue.
        </p>
        <p>
          The steps to convert an ASCII character to a hex string are as
          follows:
        </p>
        <ol>
          <li>Obtain the character that you want to convert</li>
          <li>Find its corresponding decimal character using an ASCII table</li>
          <li>Convert the decimal number to a two digit hex number</li>
          <li>Repeat for any other characters</li>
        </ol>
        <p>An ASCII table is provided below for your convenience.</p>
        <h3>Example: Encoding the letter &quot;A&quot; into hex</h3>
        <p>Using the ASCII table, the conversion is as follows:</p>
        <pre>
          &quot;A&quot; = 65<sub>10</sub> = 4×16+1 = 4×16<sup>1</sup>+1×16
          <sup>0</sup> = 41<sub>16</sub>
        </pre>
        <h3>Alternate Encodings</h3>
        <p>
          ASCII is not the only encoding type used today. In its non-extended
          form, it only has the capability to represent 128 basic characters. To
          combat this, the UTF-8 encoding was created, capable of representing
          all 1,112,064 valid Unicode characters. Other, less popular encodings
          have been created, primarily for the purpose of better representing
          other script types, or as proprietary encodings for specific machines.
          This converter uses UTF-8 encoding.
        </p>
        <h3>ASCII Table</h3>
        <table>
          <thead>
            <tr>
              <th>ASCII Character</th>
              <th>Hexadecimal</th>
              <th>Binary</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NUL</td>
              <td>00</td>
              <td>00000000</td>
            </tr>
            <tr>
              <td>SOH</td>
              <td>01</td>
              <td>00000001</td>
            </tr>
            <tr>
              <td>STX</td>
              <td>02</td>
              <td>00000010</td>
            </tr>
            <tr>
              <td>ETX</td>
              <td>03</td>
              <td>00000011</td>
            </tr>
            <tr>
              <td>EOT</td>
              <td>04</td>
              <td>00000100</td>
            </tr>
            <tr>
              <td>ENQ</td>
              <td>05</td>
              <td>00000101</td>
            </tr>
            <tr>
              <td>ACK</td>
              <td>06</td>
              <td>00000110</td>
            </tr>
            <tr>
              <td>BEL</td>
              <td>07</td>
              <td>00000111</td>
            </tr>
            <tr>
              <td>BS</td>
              <td>08</td>
              <td>00001000</td>
            </tr>
            <tr>
              <td>HT</td>
              <td>09</td>
              <td>00001001</td>
            </tr>
            <tr>
              <td>LF</td>
              <td>0A</td>
              <td>00001010</td>
            </tr>
            <tr>
              <td>VT</td>
              <td>0B</td>
              <td>00001011</td>
            </tr>
            <tr>
              <td>FF</td>
              <td>0C</td>
              <td>00001100</td>
            </tr>
            <tr>
              <td>CR</td>
              <td>0D</td>
              <td>00001101</td>
            </tr>
            <tr>
              <td>SO</td>
              <td>0E</td>
              <td>00001110</td>
            </tr>
            <tr>
              <td>SI</td>
              <td>0F</td>
              <td>00001111</td>
            </tr>
            <tr>
              <td>DLE</td>
              <td>10</td>
              <td>00010000</td>
            </tr>
            <tr>
              <td>DC1</td>
              <td>11</td>
              <td>00010001</td>
            </tr>
            <tr>
              <td>DC2</td>
              <td>12</td>
              <td>00010010</td>
            </tr>
            <tr>
              <td>DC3</td>
              <td>13</td>
              <td>00010011</td>
            </tr>
            <tr>
              <td>DC4</td>
              <td>14</td>
              <td>00010100</td>
            </tr>
            <tr>
              <td>NAK</td>
              <td>15</td>
              <td>00010101</td>
            </tr>
            <tr>
              <td>SYN</td>
              <td>16</td>
              <td>00010110</td>
            </tr>
            <tr>
              <td>ETB</td>
              <td>17</td>
              <td>00010111</td>
            </tr>
            <tr>
              <td>CAN</td>
              <td>18</td>
              <td>00011000</td>
            </tr>
            <tr>
              <td>EM</td>
              <td>19</td>
              <td>00011001</td>
            </tr>
            <tr>
              <td>SUB</td>
              <td>1A</td>
              <td>00011010</td>
            </tr>
            <tr>
              <td>ESC</td>
              <td>1B</td>
              <td>00011011</td>
            </tr>
            <tr>
              <td>FS</td>
              <td>1C</td>
              <td>00011100</td>
            </tr>
            <tr>
              <td>GS</td>
              <td>1D</td>
              <td>00011101</td>
            </tr>
            <tr>
              <td>RS</td>
              <td>1E</td>
              <td>00011110</td>
            </tr>
            <tr>
              <td>US</td>
              <td>1F</td>
              <td>00011111</td>
            </tr>
            <tr>
              <td>Space</td>
              <td>20</td>
              <td>00100000</td>
            </tr>
            <tr>
              <td>!</td>
              <td>21</td>
              <td>00100001</td>
            </tr>
            <tr>
              <td>&quot;</td>
              <td>22</td>
              <td>00100010</td>
            </tr>
            <tr>
              <td>#</td>
              <td>23</td>
              <td>00100011</td>
            </tr>
            <tr>
              <td>$</td>
              <td>24</td>
              <td>00100100</td>
            </tr>
            <tr>
              <td>%</td>
              <td>25</td>
              <td>00100101</td>
            </tr>
            <tr>
              <td>&amp;</td>
              <td>26</td>
              <td>00100110</td>
            </tr>
            <tr>
              <td>&#39;</td>
              <td>27</td>
              <td>00100111</td>
            </tr>
            <tr>
              <td>(</td>
              <td>28</td>
              <td>00101000</td>
            </tr>
            <tr>
              <td>)</td>
              <td>29</td>
              <td>00101001</td>
            </tr>
            <tr>
              <td>*</td>
              <td>2A</td>
              <td>00101010</td>
            </tr>
            <tr>
              <td>+</td>
              <td>2B</td>
              <td>00101011</td>
            </tr>
            <tr>
              <td>,</td>
              <td>2C</td>
              <td>00101100</td>
            </tr>
            <tr>
              <td>-</td>
              <td>2D</td>
              <td>00101101</td>
            </tr>
            <tr>
              <td>.</td>
              <td>2E</td>
              <td>00101110</td>
            </tr>
            <tr>
              <td>/</td>
              <td>2F</td>
              <td>00101111</td>
            </tr>
            <tr>
              <td>0</td>
              <td>30</td>
              <td>00110000</td>
            </tr>
            <tr>
              <td>1</td>
              <td>31</td>
              <td>00110001</td>
            </tr>
            <tr>
              <td>2</td>
              <td>32</td>
              <td>00110010</td>
            </tr>
            <tr>
              <td>3</td>
              <td>33</td>
              <td>00110011</td>
            </tr>
            <tr>
              <td>4</td>
              <td>34</td>
              <td>00110100</td>
            </tr>
            <tr>
              <td>5</td>
              <td>35</td>
              <td>00110101</td>
            </tr>
            <tr>
              <td>6</td>
              <td>36</td>
              <td>00110110</td>
            </tr>
            <tr>
              <td>7</td>
              <td>37</td>
              <td>00110111</td>
            </tr>
            <tr>
              <td>8</td>
              <td>38</td>
              <td>00111000</td>
            </tr>
            <tr>
              <td>9</td>
              <td>39</td>
              <td>00111001</td>
            </tr>
            <tr>
              <td>:</td>
              <td>3A</td>
              <td>00111010</td>
            </tr>
            <tr>
              <td>;</td>
              <td>3B</td>
              <td>00111011</td>
            </tr>
            <tr>
              <td>&lt;</td>
              <td>3C</td>
              <td>00111100</td>
            </tr>
            <tr>
              <td>=</td>
              <td>3D</td>
              <td>00111101</td>
            </tr>
            <tr>
              <td>&gt;</td>
              <td>3E</td>
              <td>00111110</td>
            </tr>
            <tr>
              <td>?</td>
              <td>3F</td>
              <td>00111111</td>
            </tr>
            <tr>
              <td>@</td>
              <td>40</td>
              <td>01000000</td>
            </tr>
            <tr>
              <td>A</td>
              <td>41</td>
              <td>01000001</td>
            </tr>
            <tr>
              <td>B</td>
              <td>42</td>
              <td>01000010</td>
            </tr>
            <tr>
              <td>C</td>
              <td>43</td>
              <td>01000011</td>
            </tr>
            <tr>
              <td>D</td>
              <td>44</td>
              <td>01000100</td>
            </tr>
            <tr>
              <td>E</td>
              <td>45</td>
              <td>01000101</td>
            </tr>
            <tr>
              <td>F</td>
              <td>46</td>
              <td>01000110</td>
            </tr>
            <tr>
              <td>G</td>
              <td>47</td>
              <td>01000111</td>
            </tr>
            <tr>
              <td>H</td>
              <td>48</td>
              <td>01001000</td>
            </tr>
            <tr>
              <td>I</td>
              <td>49</td>
              <td>01001001</td>
            </tr>
            <tr>
              <td>J</td>
              <td>4A</td>
              <td>01001010</td>
            </tr>
            <tr>
              <td>K</td>
              <td>4B</td>
              <td>01001011</td>
            </tr>
            <tr>
              <td>L</td>
              <td>4C</td>
              <td>01001100</td>
            </tr>
            <tr>
              <td>M</td>
              <td>4D</td>
              <td>01001101</td>
            </tr>
            <tr>
              <td>N</td>
              <td>4E</td>
              <td>01001110</td>
            </tr>
            <tr>
              <td>O</td>
              <td>4F</td>
              <td>01001111</td>
            </tr>
            <tr>
              <td>P</td>
              <td>50</td>
              <td>01010000</td>
            </tr>
            <tr>
              <td>Q</td>
              <td>51</td>
              <td>01010001</td>
            </tr>
            <tr>
              <td>R</td>
              <td>52</td>
              <td>01010010</td>
            </tr>
            <tr>
              <td>S</td>
              <td>53</td>
              <td>01010011</td>
            </tr>
            <tr>
              <td>T</td>
              <td>54</td>
              <td>01010100</td>
            </tr>
            <tr>
              <td>U</td>
              <td>55</td>
              <td>01010101</td>
            </tr>
            <tr>
              <td>V</td>
              <td>56</td>
              <td>01010110</td>
            </tr>
            <tr>
              <td>W</td>
              <td>57</td>
              <td>01010111</td>
            </tr>
            <tr>
              <td>X</td>
              <td>58</td>
              <td>01011000</td>
            </tr>
            <tr>
              <td>Y</td>
              <td>59</td>
              <td>01011001</td>
            </tr>
            <tr>
              <td>Z</td>
              <td>5A</td>
              <td>01011010</td>
            </tr>
            <tr>
              <td>[</td>
              <td>5B</td>
              <td>01011011</td>
            </tr>
            <tr>
              <td>\</td>
              <td>5C</td>
              <td>01011100</td>
            </tr>
            <tr>
              <td>]</td>
              <td>5D</td>
              <td>01011101</td>
            </tr>
            <tr>
              <td>^</td>
              <td>5E</td>
              <td>01011110</td>
            </tr>
            <tr>
              <td>_</td>
              <td>5F</td>
              <td>01011111</td>
            </tr>
            <tr>
              <td>`</td>
              <td>60</td>
              <td>01100000</td>
            </tr>
            <tr>
              <td>a</td>
              <td>61</td>
              <td>01100001</td>
            </tr>
            <tr>
              <td>b</td>
              <td>62</td>
              <td>01100010</td>
            </tr>
            <tr>
              <td>c</td>
              <td>63</td>
              <td>01100011</td>
            </tr>
            <tr>
              <td>d</td>
              <td>64</td>
              <td>01100100</td>
            </tr>
            <tr>
              <td>e</td>
              <td>65</td>
              <td>01100101</td>
            </tr>
            <tr>
              <td>f</td>
              <td>66</td>
              <td>01100110</td>
            </tr>
            <tr>
              <td>g</td>
              <td>67</td>
              <td>01100111</td>
            </tr>
            <tr>
              <td>h</td>
              <td>68</td>
              <td>01101000</td>
            </tr>
            <tr>
              <td>i</td>
              <td>69</td>
              <td>01101001</td>
            </tr>
            <tr>
              <td>j</td>
              <td>6A</td>
              <td>01101010</td>
            </tr>
            <tr>
              <td>k</td>
              <td>6B</td>
              <td>01101011</td>
            </tr>
            <tr>
              <td>l</td>
              <td>6C</td>
              <td>01101100</td>
            </tr>
            <tr>
              <td>m</td>
              <td>6D</td>
              <td>01101101</td>
            </tr>
            <tr>
              <td>n</td>
              <td>6E</td>
              <td>01101110</td>
            </tr>
            <tr>
              <td>o</td>
              <td>6F</td>
              <td>01101111</td>
            </tr>
            <tr>
              <td>p</td>
              <td>70</td>
              <td>01110000</td>
            </tr>
            <tr>
              <td>q</td>
              <td>71</td>
              <td>01110001</td>
            </tr>
            <tr>
              <td>r</td>
              <td>72</td>
              <td>01110010</td>
            </tr>
            <tr>
              <td>s</td>
              <td>73</td>
              <td>01110011</td>
            </tr>
            <tr>
              <td>t</td>
              <td>74</td>
              <td>01110100</td>
            </tr>
            <tr>
              <td>u</td>
              <td>75</td>
              <td>01110101</td>
            </tr>
            <tr>
              <td>v</td>
              <td>76</td>
              <td>01110110</td>
            </tr>
            <tr>
              <td>w</td>
              <td>77</td>
              <td>01110111</td>
            </tr>
            <tr>
              <td>x</td>
              <td>78</td>
              <td>01111000</td>
            </tr>
            <tr>
              <td>y</td>
              <td>79</td>
              <td>01111001</td>
            </tr>
            <tr>
              <td>z</td>
              <td>7A</td>
              <td>01111010</td>
            </tr>
            <tr>
              <td>&#123;</td>
              <td>7B</td>
              <td>01111011</td>
            </tr>
            <tr>
              <td>|</td>
              <td>7C</td>
              <td>01111100</td>
            </tr>
            <tr>
              <td>&#125;</td>
              <td>7D</td>
              <td>01111101</td>
            </tr>
            <tr>
              <td>~</td>
              <td>7E</td>
              <td>01111110</td>
            </tr>
            <tr>
              <td>DEL</td>
              <td>7F</td>
              <td>01111111</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}
