def luhn_check_digit(prefix: str) -> int:
    digits = [int(d) for d in prefix]
    total = 0
    for i, d in enumerate(reversed(digits)):
        if i % 2 == 0:       
            d *= 2
            if d > 9:
                d -= 9
        total += d
    return (10 - total % 10) % 10

START = 485953850000000
END   = 485953859999999

start_from = START
try:
    with open("output.txt", mode="rb", newline='\n', encoding='utf-8') as f:
        f.seek(-2, 2)
        while f.read(1) != b"\n":
            f.seek(-2, 1)
        last_line = f.readline().decode('utf-8').strip()
    last_num = int(last_line.replace(" ", ""))
    start_from = (last_num // 10) + 1  

except FileNotFoundError:
    start_from = START
except OSError:
    start_from = START  

BUFFER_SIZE = 10_000

with open("output.txt", "a", buffering=1 << 20, encoding='utf-8') as f:
    buf = []
    for base in range(start_from, END + 1):
        check = luhn_check_digit(str(base))
        full = str(base) + str(check)
        buf.append(f"{full[0:4]} {full[4:8]} {full[8:12]} {full[12:16]}\n")
        if len(buf) == BUFFER_SIZE:
            f.writelines(buf)
            buf.clear()
    if buf:
        f.writelines(buf)