export default function SizeCharts() {
  return (
    <main>
      <section className="size-chart-section section-wrap" id="size-charts">
        <div className="section-heading">
          <div>
            <div className="section-kicker">05 / SIZE CHART</div>
            <h2>US Size Guide</h2>
          </div>
        </div>
        <p className="size-chart-intro">
          Below is a quick reference for converting between US apparel sizes and common measurements.
          Use these values as a starting point; please verify with your pattern specifications.
        </p>
        <table className="size-chart">
          <thead>
            <tr>
              <th>Category</th>
              <th>US Size</th>
              <th>Chest (in)</th>
              <th>Waist (in)</th>
              <th>Hip (in)</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Women – Tops</td><td>XS</td><td>32–33</td><td>24–25</td><td>34–35</td></tr>
            <tr><td></td><td>S</td><td>34–35</td><td>26–27</td><td>36–37</td></tr>
            <tr><td></td><td>M</td><td>36–37</td><td>28–29</td><td>38–39</td></tr>
            <tr><td></td><td>L</td><td>38–40</td><td>30–32</td><td>40–42</td></tr>
            <tr><td></td><td>XL</td><td>41–43</td><td>33–35</td><td>43–45</td></tr>
            <tr><td>Men – Shirts</td><td>XS</td><td>34–35</td><td>28–29</td><td>36–37</td></tr>
            <tr><td></td><td>S</td><td>36–37</td><td>30–31</td><td>38–39</td></tr>
            <tr><td></td><td>M</td><td>38–40</td><td>32–34</td><td>40–42</td></tr>
            <tr><td></td><td>L</td><td>41–43</td><td>35–37</td><td>43–45</td></tr>
            <tr><td></td><td>XL</td><td>44–46</td><td>38–40</td><td>46–48</td></tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
